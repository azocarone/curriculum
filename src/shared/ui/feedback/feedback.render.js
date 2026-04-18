export function renderError(errorType) {
    document.body.innerHTML = `
        <div class="error-screen">
            <div class="error-card">
                <h2>Ups, algo salió mal</h2>
                <p>No pudimos cargar la información del currículum. Por favor, inténtalo de nuevo.</p>
                
                <span class="error-detail">
                    Código: ${errorType || 'Error Desconocido'}
                </span>

                <button class="btn-retry" onclick="window.location.reload()">
                    Intentar de nuevo
                </button>
            </div>
        </div>
    `;
}