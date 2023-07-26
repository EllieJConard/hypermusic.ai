import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"
import React from "react"
import { HelmetProvider } from "react-helmet-async"
import { defaultTheme } from "../../../common/theme/Theme"
import { ActionDialog } from "../../../components/ActionDialog"
import { PromptDialog } from "../../../components/PromptDialog"
import { Toast } from "../../../components/Toast"
import { DialogProvider } from "../../hooks/useDialog"
import { PromptProvider } from "../../hooks/usePrompt"
import { StoreContext } from "../../hooks/useStores"
import { ThemeContext } from "../../hooks/useTheme"
import { ToastProvider } from "../../hooks/useToast"
import RootStore from "../../stores/RootStore"
import SpacesStore from "../../stores/SpacesStore"
import { SpacesStoreContext } from "../../stores/SpacesStoreContext"
import { GlobalKeyboardShortcut } from "../KeyboardShortcut/GlobalKeyboardShortcut"
import { RootView } from "../RootView/RootView"
import { EmotionThemeProvider } from "../Theme/EmotionThemeProvider"
import { GlobalCSS } from "../Theme/GlobalCSS"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.VERCEL_GIT_COMMIT_SHA,
  environment: process.env.VERCEL_ENV,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
})

const spacesStore = new SpacesStore()

export function App() {
  return (
    <React.StrictMode>
      <StoreContext.Provider value={new RootStore()}>
        <SpacesStoreContext.Provider value={spacesStore}>
          <ThemeContext.Provider value={defaultTheme}>
            <EmotionThemeProvider>
              <HelmetProvider>
                <ToastProvider component={Toast}>
                  <PromptProvider component={PromptDialog}>
                    <DialogProvider component={ActionDialog}>
                      <GlobalKeyboardShortcut />
                      <GlobalCSS />
                      <RootView />
                    </DialogProvider>
                  </PromptProvider>
                </ToastProvider>
              </HelmetProvider>
            </EmotionThemeProvider>
          </ThemeContext.Provider>
        </SpacesStoreContext.Provider>
      </StoreContext.Provider>
    </React.StrictMode>
  )
}
