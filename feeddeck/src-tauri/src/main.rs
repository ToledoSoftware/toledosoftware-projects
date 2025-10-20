// src-tauri/src/main.rs

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;
mod models;
mod fetcher;

use crate::models::{Feed, NewFeedPayload};

#[tauri::command]
async fn add_feed(payload: NewFeedPayload) -> Result<Feed, String> {
    println!("Adding feed: {}", payload.url);

    let mut url = payload.url.trim().to_string();
    if url.ends_with(')') {
        url = url.trim_end_matches(')').to_string();
    }

    let parsed_feed = fetcher::fetch_and_parse_feed(&url)
        .await
        .map_err(|e| format!("Failed to fetch feed: {}", e))?;

    let feed_id = database::internal_add_feed(&parsed_feed.title, &url)
        .map_err(|e| format!("Failed to save feed in DB: {}", e))?;

    println!("Feed saved with ID: {}", feed_id);

    Ok(Feed { id: feed_id, title: parsed_feed.title, url })
}

#[tauri::command]
async fn refresh_feed(feed_id: i64, url: String) -> Result<usize, String> {
    println!("Refreshing feed ID: {}", feed_id);

    let parsed_feed = fetcher::fetch_and_parse_feed(&url)
        .await
        .map_err(|e| format!("Failed to fetch feed: {}", e))?;

    let articles_to_add: Vec<&fetcher::ParsedArticle> = parsed_feed.items.iter().collect();
    let count = articles_to_add.len();

    database::internal_add_articles(feed_id, articles_to_add)
        .map_err(|e| format!("Failed to save articles in DB: {}", e))?;

    println!("{} articles processed for feed {}", count, feed_id);
    Ok(count)
}

#[tauri::command]
fn get_last_feed_response_snippet(max_bytes: Option<usize>) -> Result<Vec<u8>, String> {
    let path = "src-tauri/last_feed_response.bin";
    let bytes = std::fs::read(path).map_err(|e| format!("Failed to read dump: {}", e))?;
    let max = max_bytes.unwrap_or(1024);
    let len = std::cmp::min(bytes.len(), max);
    Ok(bytes[..len].to_vec())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.handle();
            if let Err(e) = database::init_database(app_handle.clone()) {
                eprintln!("Failed to initialize database: {}", e);
                std::process::exit(1);
            }
            println!("Database initialized");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            database::init_database,
            database::get_feeds,
            database::get_articles_for_feed,
            add_feed,
            refresh_feed,
            get_last_feed_response_snippet,
            database::toggle_article_read_status,
            database::set_article_read_status
        ])
        .run(tauri::generate_context!())
        .expect("Failed to run Tauri app");
}
 
