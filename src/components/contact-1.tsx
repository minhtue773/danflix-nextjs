import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { Effects } from './animate-ui/primitives/effects/effect';

export default function Contact() {
  return (
    <Effects delay={300} inView holdDelay={350} fade slide={{ direction: 'down', offset: 10 }}>
      <div className="mb-10 flex flex-col items-center gap-4">
        <h1 className="text-center font-heading text-4xl font-medium text-balance sm:text-5xl">
          Liên hệ với chúng tôi
        </h1>
        <p className="w-full text-center text-sm text-muted-foreground">
          Bạn có thắc mắc? Chúng tôi rất vui được hỗ trợ. Hãy gửi tin nhắn chúng tôi sẽ phản hồi sớm
          nhất có thể.
        </p>
      </div>
      <div className="grid gap-8 @xl:grid-cols-5">
        <div className="space-y-6 *:space-y-2 @xl:col-span-2">
          <div>
            <p className="text-sm font-medium text-foreground">Email</p>
            <Link
              href="mailto:hello@example.com"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              danflix.info@gmail.com
            </Link>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Phone</p>
            <Link
              href="tel:+1234567890"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              +84 899 383 390
            </Link>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">Office</p>
            <p className="text-sm text-muted-foreground capitalize">
              123 Main Street, Quận 2, Thành Phố Hồ Chí Minh
            </p>
          </div>
        </div>
        <Card variant="outline" className="p-6 @xl:col-span-3">
          <form action="" className="space-y-5">
            <div className="grid gap-4 @md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">
                  Họ và tên
                </Label>
                <Input type="text" id="name" name="name" placeholder="Họ và tên của bạn" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ban@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm">
                Tiêu đề
              </Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                placeholder="Chúng tôi có thể giúp gì cho bạn?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm">
                Lời nhắn
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Hãy chia sẻ thêm chi tiết..."
                required
                className="min-h-28"
              />
            </div>

            <Button className="w-full">Gửi tin nhắn</Button>
          </form>
        </Card>
      </div>
    </Effects>
  );
}
