import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export function NoteDialog() {
  return (
    <div className="grid justify-end">
      <Dialog >
        <DialogTrigger asChild>
          <Button className="bg-yelloww blue">Chú thích</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-yelloww blue ">
          <DialogHeader>
            <div className="text-black">CHÚ THÍCH</div>
          </DialogHeader>
          <div className="flex ">
            <div className="w-1/2">
              <p className="lg:text-xl leading-10">
                P: Số trận đã chơi <br />
                W: Số trận thắng <br />
                D: Số trận hòa <br />
                L: Số trận thua
              </p>
            </div>
            <div className="w-1/2">
              {" "}
              <p className="lg:text-xl leading-10">
                F: Số bàn thắng ghi được <br />
                A: Số bàn thua <br />
                +/-: Hiệu số bàn thắng <br />
                Pts: Tổng điểm
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
