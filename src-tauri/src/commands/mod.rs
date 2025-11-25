use crate::models::{Tag, Prompt};

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to Suno Prompt Architect!", name)
}

#[tauri::command]
pub fn get_tags() -> Result<Vec<Tag>, String> {
    // TODO: Load tags from bundled JSON file
    // For now, return a sample
    Ok(vec![
        Tag {
            id: "pop".to_string(),
            name: "Pop".to_string(),
            category: "genre".to_string(),
            description: "Popular music genre with catchy melodies".to_string(),
            usage: "style".to_string(),
            synonyms: Some(vec!["pop music".to_string()]),
            examples: None,
            co_occurrence: None,
            metadata: None,
        }
    ])
}

#[tauri::command]
pub fn save_prompt(prompt: Prompt) -> Result<String, String> {
    // TODO: Implement with tauri-plugin-store
    Ok(prompt.id.clone())
}

#[tauri::command]
pub fn load_prompt(id: String) -> Result<Prompt, String> {
    // TODO: Implement with tauri-plugin-store
    Err("Not implemented yet".to_string())
}
