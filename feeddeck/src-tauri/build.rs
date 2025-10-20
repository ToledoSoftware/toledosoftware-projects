fn main() {
    let out_dir = std::env::var("OUT_DIR").unwrap_or_else(|_| "target/out".to_string());
    println!("cargo:rustc-env=OUT_DIR={}", out_dir);
    tauri_build::build()
}
