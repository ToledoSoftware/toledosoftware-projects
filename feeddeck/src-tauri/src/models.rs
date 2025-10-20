// src-tauri/src/models.rs

use serde::{Deserialize, Serialize};

/// Feed returned to the frontend
#[derive(Debug, Serialize, Clone)]
pub struct Feed {
    pub id: i64,
    pub title: String,
    pub url: String,
}

/// Article returned to the frontend
#[derive(Debug, Serialize, Clone)]
pub struct Article {
    pub id: i64,
    pub feed_id: i64,
    pub title: String,
    pub url: String,
    pub description: String,
    pub date: i64, // Unix timestamp
    pub is_read: bool,
}

/// Payload used when adding a new feed
#[derive(Debug, Deserialize)]
pub struct NewFeedPayload {
    pub url: String,
}