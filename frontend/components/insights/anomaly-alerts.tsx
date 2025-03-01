import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function AnomalyAlerts() {
  // Mock data - in a real app, this would come from an API
  const anomalies = [
    {
      id: "1",
      title: "Unusual Travel Expense",
      description: "Detected an unusual ₹10,000 spend on Travel category on March 15.",
      date: "2023-03-15",
    },
    {
      id: "2",
      title: "Duplicate Transaction",
      description: "Possible duplicate payment of ₹1,499 to Netflix on March 3.",
      date: "2023-03-03",
    },
    {
      id: "3",
      title: "Subscription Increase",
      description: "Your monthly payment to Spotify increased from ₹119 to ₹189.",
      date: "2023-03-10",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Anomaly Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {anomalies.length > 0 ? (
            anomalies.map((anomaly) => (
              <Alert key={anomaly.id} variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{anomaly.title}</AlertTitle>
                <AlertDescription>{anomaly.description}</AlertDescription>
              </Alert>
            ))
          ) : (
            <div className="text-center p-4">
              <p className="text-muted-foreground">No anomalies detected</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

