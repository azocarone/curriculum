export function renderError(errorType) {
    document.body.innerHTML = `
        <div class="error-screen">
            <div class="error-screen__card">
                <h2 class="error-screen__title">Ups, algo salió mal</h2>
                <p class="error-screen__description">
                    No pudimos cargar la información del currículum. Por favor, inténtalo de nuevo.
                </p>
                
                <span class="error-screen__detail">
                    Código: ${errorType || 'Error Desconocido'}
                </span>

                <button class="error-screen__button-retry" onclick="window.location.reload()">
                    Intentar de nuevo
                </button>
            </div>
        </div>
    `;
}