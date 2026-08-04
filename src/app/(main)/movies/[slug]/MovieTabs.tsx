import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import tmdb, { getTMDBImage } from '@/lib/tmdb';
import { PackageOpen } from 'lucide-react';
import Image from 'next/image';

interface MovieTabsProps {
  type?: string;
  id?: string;
}

interface Cast {
  name: string;
  profile_path: string;
}

interface Image {
  file_path: string;
}

export default async function MovieTabs({ type, id }: MovieTabsProps) {
  const cleanId = id ? String(id).split('-')[0] : null;
  const res = await tmdb(`${type}/${cleanId}`, {
    append_to_response: 'credits,images',
    language: 'vi-VN',
  });
  const casts: Cast[] = res?.credits?.cast || [];
  const images: Image[] = res?.images?.posters || [];

  return (
    <>
      <Tabs defaultValue="casts" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="casts">Diễn Viên</TabsTrigger>

          <TabsTrigger value="images">Bộ sưu tập</TabsTrigger>
        </TabsList>
        <TabsContent value="casts">
          <div className="space-y-4 py-4">
            <h3 className="text-lg font-bold">Diễn viên</h3>
            {casts.length > 0 ? (
              <div className="grid max-h-[55vh] grid-cols-4 gap-4 overflow-auto rounded-xl md:grid-cols-8">
                {casts?.map((item, idx) => (
                  <Tooltip key={idx}>
                    <TooltipTrigger>
                      <div className="flex flex-col items-center gap-1">
                        <Avatar size="lg">
                          <AvatarImage
                            src={getTMDBImage(item.profile_path, 'w92')}
                            alt={item.name}
                          />
                          <AvatarFallback>N/A</AvatarFallback>
                        </Avatar>
                        <p className="w-full min-w-0 truncate text-center text-[12px]">
                          {item.name}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-xl bg-card px-4 py-8">
                <PackageOpen size={36} />
                <p>Đang cập nhật...</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="images">
          <div className="space-y-4 py-4">
            <h3 className="text-lg font-bold">Images</h3>
            {images.length > 0 ? (
              <div className="relative grid max-h-[55vh] grid-cols-2 gap-0 overflow-auto md:grid-cols-4">
                {images.map((poster, idx) => (
                  <div key={idx} className="relative aspect-2/3 overflow-hidden">
                    <Image
                      key={idx}
                      src={getTMDBImage(poster.file_path, 'original')}
                      alt="image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-xl bg-card px-4 py-8">
                <PackageOpen size={36} />
                <p>Không có ảnh nào</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
