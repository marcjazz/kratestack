use axum::{routing::get, Json, Router};
use serde::{Deserialize, Serialize};
use utoipa::{OpenApi, ToSchema};
use utoipa_swagger_ui::SwaggerUi;

#[derive(Serialize, Deserialize, ToSchema)]
pub struct MessageResponse {
    /// The message content
    pub message: String,
}

/// Returns a hello message
#[utoipa::path(
    get,
    path = "/api/hello",
    responses(
        (status = 200, description = "Hello message", body = MessageResponse)
    )
)]
pub async fn hello() -> Json<MessageResponse> {
    Json(MessageResponse {
        message: "Hello from Kratestack!".to_string(),
    })
}

#[derive(OpenApi)]
#[openapi(
    paths(hello),
    components(schemas(MessageResponse))
)]
pub struct ApiDoc;

pub fn app() -> Router {
    Router::new()
        .route("/api/hello", get(hello))
        .merge(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", ApiDoc::openapi()))
}
