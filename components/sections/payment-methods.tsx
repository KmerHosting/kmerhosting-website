"use client"

import { Card } from "@/components/ui/card"

export function PaymentMethods() {
  const paymentMethods = [
    {
      name: "PayPal",
      icon: "💳"
    },
    {
      name: "VISA/Mastercard", 
      icon: "💳"
    },
    {
      name: "Orange Money",
      icon: "📱"
    },
    {
      name: "MTN Mobile Money",
      icon: "📲"
    }
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Payment Methods
          </h2>
          <p className="text-muted-foreground">
            Secure payment options available
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {paymentMethods.map((method) => (
            <Card 
              key={method.name}
              className="p-4 text-center border bg-card"
            >
              <div className="text-2xl mb-2">
                {method.icon}
              </div>
              <h3 className="text-sm font-medium text-foreground">
                {method.name}
              </h3>
            </Card>
          ))}
        </div>

        {/* Contact message for custom payment methods */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            DON'T FIND YOUR PAYMENT METHOD?{" "}
            <span className="text-foreground font-medium">Contact sales for custom activation</span>{" "}
            to give you the possibility to use our service anyway.
          </p>
        </div>

        {/* Security notice */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              All payments are secured with SSL encryption
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}