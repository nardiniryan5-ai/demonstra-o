"use client"

import { useState } from "react"
import type { Screen } from "@/lib/screens-funileiro"
import { PhoneFrame } from "@/components/shared/phone-frame"
import { DispatchScreen } from "@/components/funileiro/dispatch-screen"
import { InspectionScreen } from "@/components/funileiro/inspection-screen"
import { ReportScreen } from "@/components/funileiro/report-screen"
import { BillingScreen } from "@/components/funileiro/billing-screen"
import { ProfileScreen } from "@/components/funileiro/profile-screen"
import { BottomNav } from "@/components/funileiro/bottom-nav"

export function FunileiroApp({ onExit }: { onExit: () => void }) {
  const [screen, setScreen] = useState<Screen>("dispatch")

  return (
    <PhoneFrame onExit={onExit}>
      <div className="flex min-h-[720px] flex-col bg-background">
        <main className="flex-1">
          {screen === "dispatch" && <DispatchScreen onGoToInspection={() => setScreen("inspection")} />}
          {screen === "inspection" && <InspectionScreen onGoToReport={() => setScreen("report")} />}
          {screen === "report" && <ReportScreen onFinish={() => setScreen("billing")} />}
          {screen === "billing" && <BillingScreen />}
          {screen === "profile" && <ProfileScreen onLogout={onExit} />}
        </main>
        <BottomNav active={screen} onChange={setScreen} />
      </div>
    </PhoneFrame>
  )
}
