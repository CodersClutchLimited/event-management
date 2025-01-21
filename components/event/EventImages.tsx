import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage } from "../ui/avatar";

const EventImages = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="relative w-[100px]"
    >
      <CarouselContent className="-mt-1 h-[350px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/3">
            <div className="p-1">
              <div>
                <div className="flex items-center justify-center ">
                  <Avatar className="w-[100%] h-[100%] rounded-md cursor-pointer">
                    <AvatarImage
                      src={`https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80`}
                      alt="Product"
                      className="w-[100%] h-[100%] rounded-md transition-transform duration-500 hover:scale-105"
                    />
                  </Avatar>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute top-1/2 left-[50%] transform -translate-y-1/3 -translate-x-full">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default EventImages;
