'use client';

import { Button } from '@/components/ui/button';
import { useState, type SVGProps } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const testimonials: {
  title: string;
  highlight: string;
  paragraphs?: string[]; // Thêm ? vì Item 3 không có paragraphs
  email?: string;
  note?: string; // Thêm ? vì Item 1 và 3 không có note
  intro?: string; // Thêm ? vì Item 1 và 2 không có intro
  pillars?: string[]; // Sửa từ string -> string[] và thêm ?
}[] = [
  {
    title: 'Về DANFLIX',
    highlight: 'Thế Giới Điện Ảnh Trong Tầm Tay',
    paragraphs: [
      'Chào mừng bạn đến với DANFLIX – trạm dừng chân lý tưởng dành cho những tâm hồn yêu điện ảnh.',
      'Chúng tôi ra đời với mục tiêu mang đến cho bạn một không gian giải trí đỉnh cao, nơi bạn có thể dễ dàng khám phá, theo dõi và thưởng thức hàng ngàn bộ phim thuộc mọi thể loại từ khắp nơi trên thế giới. Với giao diện hiện đại, tối ưu trên cả máy tính lẫn điện thoại cùng tốc độ phản hồi nhanh chóng, DANFLIX giúp hành trình tìm kiếm bộ phim yêu thích của bạn trở nên đơn giản và thú vị hơn bao giờ hết.',
      'Dù bạn đang tìm kiếm những tác phẩm kinh điển, phim truyền hình đang "hot" hay các bom tấn chiếu rạp mới nhất, chúng tôi luôn cập nhật liên tục để bạn không bỏ lỡ bất kỳ khoảnh khắc điện ảnh đáng giá nào.',
    ],
  },
  {
    title: 'Tuyên Bố Bản Quyền',
    highlight: '& Nguồn Dữ Liệu',
    paragraphs: [
      'Sự minh bạch và tuân thủ pháp luật là tôn chỉ hoạt động hàng đầu của DANFLIX.',
      'Chúng tôi tôn trọng tuyệt đối quyền sở hữu trí tuệ của các tác giả và nhà sản xuất. Nếu bạn là chủ sở hữu bản quyền của bất kỳ nội dung nào xuất hiện trên trang web và không muốn nội dung đó tiếp tục được liên kết, vui lòng liên hệ với chúng tôi qua email:',
    ],
    email: 'danflix.info@gmail.com',
    note: 'Chúng tôi sẽ tiến hành rà soát và gỡ bỏ liên kết trong vòng 24–48 giờ làm việc.',
  },
  {
    title: 'Trải Nghiệm Người Dùng',
    highlight: '& Giá Trị Cốt Lõi',
    intro:
      'Chúng tôi tin rằng việc xem phim trực tuyến phải luôn thoải mái, an toàn và tiện lợi. DANFLIX được xây dựng dựa trên 3 trụ cột chính:',
    pillars: [
      'Truy cập mọi lúc, mọi nơi mà không bắt buộc đăng ký tài khoản hay trả phí dịch vụ.',
      'Thiết kế trực quan, dễ thao tác, tích hợp bộ lọc tìm kiếm thông minh theo thể loại, quốc gia và năm phát hành.',
      'Tối ưu hóa tốc độ tải trang, cam kết hạn chế tối đa các quảng cáo độc hại hay gây phiền phức cho trải nghiệm xem phim.',
    ],
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonials[activeIndex];

  const previousTestimonial = () => {
    setActiveIndex((index) => (index - 1 + testimonials.length) % testimonials.length);
  };

  const nextTestimonial = () => {
    setActiveIndex((index) => (index + 1) % testimonials.length);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-4"
            aria-label="read previous testimonial"
            onClick={previousTestimonial}
            disabled={activeIndex === 0}
          >
            <ArrowIcon className="size-3!" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-4"
            aria-label="read next testimonial"
            onClick={nextTestimonial}
            disabled={activeIndex === testimonials.length - 1}
          >
            <ArrowIcon className="size-3! rotate-180" />
          </Button>
        </div>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="mb-6 text-2xl leading-snug font-bold text-foreground md:text-3xl md:leading-tight">
              {activeTestimonial.title}{' '}
              <span className="inline-block rounded bg-emerald-500/10 px-2 py-0.5 text-red-500">
                {activeTestimonial.highlight}
              </span>
            </h2>

            {/* Render các đoạn văn bản (Section 1 & 2) */}
            {activeTestimonial.paragraphs && (
              <div className="mb-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                {activeTestimonial.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

            {/* Khối Highlight Email (Cho Section 2) */}
            {activeTestimonial.email && (
              <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm md:text-base">
                <span className="text-muted-foreground">Email hỗ trợ:</span>
                <a
                  href={`mailto:${activeTestimonial.email}`}
                  className="font-medium text-red-500 hover:underline"
                >
                  {activeTestimonial.email}
                </a>
              </div>
            )}

            {/* Ghi chú thời gian phản hồi (Cho Section 2) */}
            {activeTestimonial.note && (
              <p className="text-xs text-muted-foreground/80 italic">* {activeTestimonial.note}</p>
            )}

            {/* Render Trụ cột / Mẹo (Cho Section 3) */}
            {activeTestimonial.intro && (
              <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                {activeTestimonial.intro}
              </p>
            )}

            {activeTestimonial.pillars && (
              <ul className="space-y-3 pt-2">
                {activeTestimonial.pillars.map((pillar, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 p-3 text-sm text-foreground"
                  >
                    <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-red-500" />
                    <span>{pillar}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1L1 8L8 15M1 8H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
