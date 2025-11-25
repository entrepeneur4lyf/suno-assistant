use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Tag {
    pub id: String,
    pub name: String,
    pub category: String,
    pub description: String,
    pub usage: String, // "style" | "lyrics" | "both"
    pub synonyms: Option<Vec<String>>,
    pub examples: Option<Vec<String>>,
    pub co_occurrence: Option<CoOccurrence>,
    pub metadata: Option<HashMap<String, serde_json::Value>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CoOccurrence {
    pub strong: Vec<String>,
    pub avoid: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Prompt {
    pub id: String,
    pub name: String,
    pub created_at: String,
    pub updated_at: String,
    pub style: String,
    pub lyrics: String,
    pub tags: Vec<String>,
    pub structure: PromptStructure,
    pub advanced: Option<AdvancedParams>,
    pub template: Option<bool>,
    pub favorite: Option<bool>,
    pub notes: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PromptStructure {
    pub objective: String,
    pub voice: String,
    pub mood: String,
    pub tempo: Option<String>,
    pub duration: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AdvancedParams {
    pub weirdness: Option<f32>,
    pub style_influence: Option<f32>,
    pub vocal_gender: Option<String>,
    pub exclude_styles: Option<Vec<String>>,
}
