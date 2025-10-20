use anyhow::Result;
use once_cell::sync::OnceCell;
use rusqlite::{params, Connection};
use std::fs;
use std::sync::Mutex;
use tauri::{AppHandle, Manager};

use crate::models::Feed;

// Singleton DB connection (thread-safe)
pub static DB: OnceCell<Mutex<Connection>> = OnceCell::new();

fn get_db_path(app_handle: &AppHandle) -> Result<String> {
    let path = app_handle.path().app_data_dir()?.join("feeddeck.sqlite");
    if let Some(parent) = path.parent() {
        if !parent.exists() {
            fs::create_dir_all(parent)?;
        }
    }
    Ok(path.to_string_lossy().to_string())
}

#[tauri::command]
pub fn init_database(app_handle: AppHandle) -> Result<(), String> {
    let db_path = get_db_path(&app_handle).map_err(|e| e.to_string())?;
    let conn = Connection::open(&db_path).map_err(|e| e.to_string())?;
    conn.execute("PRAGMA foreign_keys = ON;", []).map_err(|e| e.to_string())?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS feeds (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            url TEXT NOT NULL UNIQUE
        )",
        [],
    ).map_err(|e| e.to_string())?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            feed_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            url TEXT NOT NULL UNIQUE,
            description TEXT,
            date INTEGER NOT NULL,
            is_read BOOLEAN NOT NULL DEFAULT 0,
            FOREIGN KEY (feed_id) REFERENCES feeds(id) ON DELETE CASCADE
        )",
        [],
    ).map_err(|e| e.to_string())?;

    DB.set(Mutex::new(conn)).map_err(|_| "DB already initialized".to_string())?;
    Ok(())
}

#[tauri::command]
pub fn get_feeds() -> Result<Vec<Feed>, String> {
    let conn_guard = DB.get().ok_or("DB not initialized")?.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn_guard.prepare("SELECT id, title, url FROM feeds ORDER BY title").map_err(|e| e.to_string())?;

    let feeds_iter = stmt.query_map([], |row| {
        Ok(Feed { id: row.get(0)?, title: row.get(1)?, url: row.get(2)? })
    }).map_err(|e| e.to_string())?;

    let mut feeds = Vec::new();
    for feed in feeds_iter {
        feeds.push(feed.map_err(|e| e.to_string())?);
    }
    Ok(feeds)
}

pub fn internal_add_feed(title: &str, url: &str) -> Result<i64, String> {
    let conn_guard = DB.get().ok_or("DB not initialized")?.lock().map_err(|e| e.to_string())?;
    conn_guard.execute("INSERT INTO feeds (title, url) VALUES (?, ?)", params![title, url]).map_err(|e| e.to_string())?;
    Ok(conn_guard.last_insert_rowid())
}

pub fn internal_add_articles(feed_id: i64, articles: Vec<&crate::fetcher::ParsedArticle>) -> Result<(), String> {
    let conn_guard = DB.get().ok_or("DB not initialized")?.lock().map_err(|e| e.to_string())?;
    for article in articles {
        conn_guard.execute(
            "INSERT OR IGNORE INTO articles (feed_id, title, url, description, date, is_read) VALUES (?, ?, ?, ?, ?, 0)",
            params![feed_id, article.title, article.url, article.description, article.date],
        ).map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[tauri::command]
pub fn get_articles_for_feed(feed_id: i64) -> Result<Vec<crate::models::Article>, String> {
    let conn_guard = DB.get().ok_or("DB not initialized")?.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn_guard.prepare(
        "SELECT id, feed_id, title, url, description, date, is_read FROM articles WHERE feed_id = ? ORDER BY date DESC"
    ).map_err(|e| e.to_string())?;

    let articles_iter = stmt.query_map([feed_id], |row| {
        Ok(crate::models::Article {
            id: row.get(0)?, feed_id: row.get(1)?, title: row.get(2)?, url: row.get(3)?, description: row.get(4)?, date: row.get(5)?, is_read: row.get(6)?,
        })
    }).map_err(|e| e.to_string())?;

    let mut articles = Vec::new();
    for art in articles_iter {
        articles.push(art.map_err(|e| e.to_string())?);
    }
    Ok(articles)
}

#[tauri::command]
pub fn set_article_read_status(article_id: i64, is_read: bool) -> Result<(), String> {
    let conn_guard = DB.get().ok_or("DB not initialized")?.lock().map_err(|e| e.to_string())?;
    conn_guard.execute("UPDATE articles SET is_read = ?1 WHERE id = ?2", params![is_read, article_id]).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn toggle_article_read_status(article_id: i64) -> Result<bool, String> {
    let conn_guard = DB.get().ok_or("DB not initialized")?.lock().map_err(|e| e.to_string())?;
    let current: i64 = conn_guard.query_row("SELECT is_read FROM articles WHERE id = ?1", [article_id], |row| row.get(0)).map_err(|e| e.to_string())?;
    let new_val = if current == 0 { 1 } else { 0 };
    conn_guard.execute("UPDATE articles SET is_read = ?1 WHERE id = ?2", params![new_val, article_id]).map_err(|e| e.to_string())?;
    Ok(new_val != 0)
}