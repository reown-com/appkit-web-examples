export const updateStateDisplay = (elementId, state) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.innerHTML = JSON.stringify(state, null, 2)
    }
  }
  
  export const updateTheme = mode => {
    document.documentElement.setAttribute('data-theme', mode)
    document.body.className = mode
  }

  export const updateButtonVisibility = (isConnected) => {
    const connectedOnlyButtons = document.querySelectorAll('[data-connected-only]')
    connectedOnlyButtons.forEach(button => {
        if (!isConnected) button.style.display = 'none'
        else button.style.display = ''
    })
  }