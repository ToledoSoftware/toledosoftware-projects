use anyhow::{anyhow, Result};
use rss::Channel;
use atom_syndication::Feed as AtomFeed;
use scraper::{Html, Selector};
use reqwest::header::CONTENT_TYPE;

#[derive(Debug)]
pub struct ParsedFeed {
    pub title: String,
    pub items: Vec<ParsedArticle>,
}

#[derive(Debug)]
pub struct ParsedArticle {
    pub title: String,
    pub url: String,
    pub description: String,
    pub date: i64,
}

/// Fetch and parse a feed URL, with heuristics for RSS/Atom/HTML discovery.
pub async fn fetch_and_parse_feed(start_url: &str) -> Result<ParsedFeed> {
    let client = reqwest::Client::new();
    let mut current_url = start_url.to_string();
    let max_follow = 4;

    let mut last_content: Option<Vec<u8>> = None;
    for _ in 0..max_follow {
        let resp = client
            .get(&current_url)
            .header("User-Agent", "FeedDeck RSS Reader (github.com/ToledoSoftware/feeddeck)")
            .send()
            .await?;

        let status = resp.status();
        let content_type = resp.headers().get(CONTENT_TYPE).and_then(|v| v.to_str().ok()).map(|s| s.to_string());
    let content = resp.bytes().await?;
    last_content = Some(content.to_vec());

    // Debug info
        println!("fetch_and_parse_feed: url={} status={} content-type={:?}", current_url, status, content_type);

        // On non-2xx status: dump response and return an error
        if !status.is_success() {
            if let Err(e) = dump_response_for_debug(&content) {
                println!("dump_response_for_debug failed: {}", e);
            } else {
                println!("Wrote last_feed_response.bin for failed HTTP response");
            }
            return Err(anyhow!(format!("HTTP {} returned; content-type={:?}", status, content_type)));
        }

        let body_str = String::from_utf8_lossy(&content).to_string();

    // Try parse as RSS
        if let Ok(channel) = Channel::read_from(&content[..]) {
            let items: Vec<ParsedArticle> = channel
                .items()
                .iter()
                .map(|item| {
                    let date = item.pub_date()
                        .and_then(|d| chrono::DateTime::parse_from_rfc2822(d).ok())
                        .map(|dt| dt.timestamp())
                        .unwrap_or_else(|| chrono::Utc::now().timestamp());

                    ParsedArticle {
                        title: item.title().unwrap_or("").to_string(),
                        url: item.link().unwrap_or("").to_string(),
                        description: item.description().unwrap_or_else(|| item.content().unwrap_or_default()).to_string(),
                        date,
                    }
                })
                .collect();

            return Ok(ParsedFeed {
                title: channel.title().to_string(),
                items,
            });
        }

    // Try Atom
        if let Ok(atom) = AtomFeed::read_from(&content[..]) {
            let items: Vec<ParsedArticle> = atom
                .entries()
                .iter()
                .map(|entry| {
                    let title = entry.title().to_string();
                    let link = entry
                        .links()
                        .get(0)
                        .map(|l| l.href().to_string())
                        .unwrap_or_default();
                    let summary = entry.summary().map(|s| s.to_string()).unwrap_or_default().to_string();
                    let date = chrono::Utc::now().timestamp();

                    ParsedArticle {
                        title,
                        url: link,
                        description: summary,
                        date,
                    }
                })
                .collect();

            return Ok(ParsedFeed {
                title: atom.title().to_string(),
                items,
            });
        }

    // If HTML, try discover <link rel="alternate"> feed links and follow
        if body_str.trim_start().to_lowercase().starts_with("<!doctype html") || body_str.trim_start().to_lowercase().starts_with("<html") {
            let document = Html::parse_document(&body_str);
            let selector = Selector::parse("link[rel=alternate]").unwrap();
            let mut found = false;
            for el in document.select(&selector) {
                if let Some(typ) = el.value().attr("type") {
                    if typ.contains("rss") || typ.contains("xml") || typ.contains("atom") {
                        if let Some(href) = el.value().attr("href") {
                            if let Ok(feed_url) = reqwest::Url::parse(href).or_else(|_| reqwest::Url::parse(&current_url).and_then(|base| base.join(href))) {
                                current_url = feed_url.as_str().to_string();
                                found = true;
                                break;
                            }
                        }
                    }
                }
            }
            if found {
                continue; // follow discovered feed URL
            }
        }

    // Fallback: try trimming leading junk and re-parse
        let lower = body_str.to_lowercase();
        if let Some(idx) = lower.find("<rss").or_else(|| lower.find("<feed")) {
            let trimmed = &content[idx..];
            if let Ok(channel) = Channel::read_from(trimmed) {
                let items: Vec<ParsedArticle> = channel
                    .items()
                    .iter()
                    .map(|item| {
                        let date = item.pub_date()
                            .and_then(|d| chrono::DateTime::parse_from_rfc2822(d).ok())
                            .map(|dt| dt.timestamp())
                            .unwrap_or_else(|| chrono::Utc::now().timestamp());

                        ParsedArticle {
                            title: item.title().unwrap_or("").to_string(),
                            url: item.link().unwrap_or("").to_string(),
                            description: item.description().unwrap_or_else(|| item.content().unwrap_or_default()).to_string(),
                            date,
                        }
                    })
                    .collect();

                return Ok(ParsedFeed {
                    title: channel.title().to_string(),
                    items,
                });
            }
            if let Ok(atom) = AtomFeed::read_from(trimmed) {
                let items: Vec<ParsedArticle> = atom
                    .entries()
                    .iter()
                    .map(|entry| {
                        let title = entry.title().to_string();
                        let link = entry
                            .links()
                            .get(0)
                            .map(|l| l.href().to_string())
                            .unwrap_or_default();
                        let summary = entry.summary().map(|s| s.to_string()).unwrap_or_default().to_string();
                        let date = chrono::Utc::now().timestamp();

                        ParsedArticle {
                            title,
                            url: link,
                            description: summary,
                            date,
                        }
                    })
                    .collect();

                return Ok(ParsedFeed {
                    title: atom.title().to_string(),
                    items,
                });
            }
        }
    }

    // Final fallback: dump last response for inspection
    if let Some(bytes) = last_content.as_ref() {
        if let Err(e) = dump_response_for_debug(bytes) {
            println!("dump_response_for_debug failed: {}", e);
        } else {
            println!("Wrote last_feed_response.bin for failed parse");
        }
    }
    Err(anyhow!("the input did not begin with an rss tag"))
}

// Write a raw response dump next to the running executable for inspection.
#[allow(dead_code)]
pub fn dump_response_for_debug(bytes: &[u8]) -> Result<(), std::io::Error> {
    use std::fs::File;
    use std::io::{self, Write};
    // Write the dump next to the running executable so the path exists when the
    // Tauri app is started (avoids relative path issues).
    let exe_path = std::env::current_exe()?;
    let parent = exe_path.parent().ok_or_else(|| io::Error::new(io::ErrorKind::Other, "cannot determine exe parent"))?;
    let dump_path = parent.join("last_feed_response.bin");
    let mut f = File::create(&dump_path)?;
    f.write_all(bytes)?;
    println!("Wrote dump to {:?}", dump_path);
    Ok(())
}