setTimeout(() => {
    import('./components').then(
        () => {
            document?.getElementById('app')?.append(document.createElement('app-tri'))
        }
    )
}, 0)
