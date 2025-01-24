import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const InviteStaff = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Invite User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Staff</DialogTitle>
          <DialogDescription>
            Enter User&apos;s information and click send
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="text-left">
                Please Enter User&apos;s Email
            </Label>
            <Input id="name" placeholder="john@gmail.com" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant="default">Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default InviteStaff