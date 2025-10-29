"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ProductFeature {
  name: string
  description: string
  included: boolean
}

interface ProductInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productName: string
  description: string
  features: ProductFeature[]
  isPopular?: boolean
}

export function ProductInfoDialog({
  open,
  onOpenChange,
  productName,
  description,
  features,
  isPopular
}: ProductInfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {productName}
            {isPopular && <Badge variant="secondary" className="bg-[#07C983] text-white">Popular</Badge>}
          </DialogTitle>
          <DialogDescription className="text-left">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <h4 className="font-semibold mb-3">Features & Benefits:</h4>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  feature.included ? 'bg-[#07C983]' : 'bg-gray-400'
                }`} />
                <div>
                  <div className="font-medium">{feature.name}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button asChild className="bg-[#07C983] hover:bg-[#07C983]/90 text-white">
            <Link href="/pricing" onClick={() => onOpenChange(false)}>
              View Pricing
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}