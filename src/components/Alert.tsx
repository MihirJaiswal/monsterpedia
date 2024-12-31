import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaDonate } from "react-icons/fa";
import Image from "next/image";

export function AlertDialogDemo() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
            <div className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
          <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
          <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
          <span className="relative z-20 flex items-center text-sm">
           <div className="flex items-center justify-between gap-2">
           <FaDonate/>
            <button  className="z-30">
              Donate Here
            </button>
           </div>
          </span>
        </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Support Me</AlertDialogTitle>
                    <AlertDialogDescription>
                        Scan the QR code below to donate and support our project.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-center py-4">
                    <Image src="/qr.png" alt="QR Code for Donations" width={200} loading="lazy"  height={200} className="w-48" quality={100} />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-gray-800 hover:text-gay-600">Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
