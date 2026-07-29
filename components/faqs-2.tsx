'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const FAQ_DATA = [
  {
    id: 'item-1',
    question: 'Web có thu phí không? Tôi có cần đăng ký tài khoản không?',
    answer:
      'Không. DANFLIX phục vụ hoàn toàn miễn phí. Bạn không cần đăng ký tài khoản, không cần nhập thông tin cá nhân hay thẻ ngân hàng để thưởng thức các bộ phim tại đây.',
  },
  {
    id: 'item-2',
    question: 'Tại sao một số phim không xem được hoặc load rất chậm?',
    answer:
      'Phim trên trang được tổng hợp từ các giao diện API công khai trên Internet. Sự cố không xem được hoặc giật lag thường do một trong các nguyên nhân sau: Máy chủ (Server) chứa video gốc của API đó đang bị quá tải hoặc tạm thời bảo trì. Đường truyền Internet của bạn không ổn định.',
  },
  {
    id: 'item-3',
    question: 'Phim có vi phạm bản quyền không?',
    answer:
      'DANFLIX là một công cụ tìm kiếm và trình hiển thị nội dung. Chúng tôi không sở hữu, không lưu trữ và không tải lên bất kỳ tệp video nào trên máy chủ riêng. Tất cả nội dung đều được nhúng từ các nguồn API mở công khai trên mạng.',
  },
  {
    id: 'item-4',
    question: 'Làm sao để yêu cầu thêm phim mới hoặc báo lỗi phim hỏng?',
    answer:
      'Bạn có thể gửi thông tin trực tiếp cho đội ngũ quản trị qua trang [Báo Lỗi / Yêu Cầu Phim] hoặc liên hệ qua Email danflix.info@gmail.com. Chúng tôi sẽ kiểm tra và cập nhật lại nguồn API sớm nhất có thể.',
  },
  {
    id: 'item-5',
    question: 'Tôi có thể xem phim trên điện thoại hoặc TV thông minh (Smart TV) được không?',
    answer:
      'Có. Giao diện của chúng tôi được tối ưu hóa (Responsive) để tương thích tốt trên mọi thiết bị: Máy tính, Máy tính bảng, Điện thoại (iOS/Android) và cả trình duyệt trên Smart TV.',
  },
];
export default function FAQs() {
  return (
    <section>
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-8 sm:px-6 lg:px-8 xl:py-24">
        <div className="flex animate-in flex-col items-center gap-4 delay-100 duration-1000 ease-in-out fill-mode-both slide-in-from-top-10 fade-in">
          <h2 className="font-heading text-4xl font-medium text-balance sm:text-5xl">FAQs</h2>
          <p className="text-sm text-muted-foreground">Câu hỏi của bạn đã được giải đáp</p>
          <p className="text-sm text-muted-foreground">
            Nếu bạn cần thêm?{' '}
            <Link href="/contact" className="font-medium text-red-500 hover:underline">
              Liên hệ ngay
            </Link>
          </p>
        </div>
        <div>
          <Accordion className="flex w-full flex-col gap-6">
            {FAQ_DATA.map((faq, index) => (
              <AccordionItem
                key={`item-${index}`}
                value={`item-${index}`}
                className={cn(
                  'group/item flex animate-in flex-col gap-3 rounded-2xl border border-border p-6 transition-colors duration-700 fill-mode-both fade-in slide-in-from-bottom-8 data-open:bg-accent',
                  index === 0 && 'delay-100',
                  index === 1 && 'delay-200',
                  index === 2 && 'delay-300',
                  index === 3 && 'delay-400',
                  index === 4 && 'delay-500'
                )}
              >
                <AccordionTrigger className="cursor-pointer p-0 text-lg font-medium hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
                  {faq.question}
                  <PlusIcon className="h-6 w-6 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45" />
                </AccordionTrigger>
                <AccordionContent className="p-0 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
