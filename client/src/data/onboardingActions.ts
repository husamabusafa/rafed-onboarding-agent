import type { LocalizedString } from './localization'
import { ls } from './localization'

export type OnboardingAction = {
  id: string
  title: LocalizedString
  description: LocalizedString
  category: 'IT' | 'HR' | 'Facilities' | 'Learning'
  owner?: string
  sessionDate?: LocalizedString
  steps: LocalizedString[]
}

export const onboardingActions: OnboardingAction[] = [
  {
    id: 'fingerprint-registration',
    title: ls('Fingerprint Registration', 'تسجيل البصمة'),
    description: ls('Register your fingerprint for office attendance access and time tracking.', 'سجّل بصمتك للوصول إلى نظام الحضور والانصراف وتتبع الدوام.'),
    category: 'Facilities',
    sessionDate: ls('Within 48 hours of receiving the Operations email', 'خلال 48 ساعة من استلام رسالة فريق العمليات'),
    steps: [
      ls('Wait for the notification email from the Operations team.', 'انتظر بريد الإشعار من فريق العمليات.'),
      ls('Meet the representative in the office to complete the registration.', 'قابل ممثل العمليات في المكتب لإكمال التسجيل.'),
      ls('Confirm the registration is finalized within 48 hours.', 'تأكد من إتمام التسجيل خلال 48 ساعة.'),
    ],
  },
  {
    id: 'hr-system-access',
    title: ls('HR System (ERP / OFOQ) Access', 'الدخول إلى نظام الموارد البشرية (ERP / OFOQ)'),
    description: ls('Sign in to the HR system to manage requests and view HR information.', 'سجّل الدخول إلى نظام الموارد البشرية لإدارة الطلبات والاطلاع على المعلومات.'),
    category: 'HR',
    steps: [
      ls('Open the sign-in page using the application link provided by the company.', 'افتح صفحة تسجيل الدخول عبر رابط التطبيق المقدم من الشركة.'),
      ls('Enter your user ID and password.', 'أدخل اسم المستخدم وكلمة المرور.'),
      ls('Click Sign In and verify you can access the home page.', 'اضغط تسجيل الدخول وتأكد من إمكانية الوصول للصفحة الرئيسية.'),
    ],
  },
  {
    id: 'internal-portal',
    title: ls('Internal Portal Setup', 'إعداد البوابة الداخلية'),
    description: ls('Get familiar with the internal portal to access information and services.', 'تعرّف على البوابة الداخلية للوصول إلى المعلومات والخدمات.'),
    category: 'HR',
    steps: [
      ls('Sign in to the internal portal using your company credentials.', 'سجّل الدخول إلى البوابة الداخلية باستخدام بيانات الشركة.'),
      ls('Review your sector overview and available services.', 'استعرض نبذة القطاع والخدمات المتاحة.'),
      ls('Check internal mobility (Step), news, and announcements.', 'اطّلع على التنقل الداخلي (Step) والأخبار والإعلانات.'),
    ],
  },
  {
    id: 'wala-plus',
    title: ls('Wala Plus Discounts', 'خصومات ولاء بلس'),
    description: ls('Activate your employee discounts and offers through Wala Plus.', 'فعّل خصومات الموظفين والعروض عبر ولاء بلس.'),
    category: 'HR',
    steps: [
      ls('On day 1, Operations will register you in Wala Plus.', 'في اليوم الأول سيقوم فريق العمليات بتسجيلك في ولاء بلس.'),
      ls('Check your email for the notification and user guide.', 'تحقّق من بريدك لرسالة الإشعار ودليل المستخدم.'),
      ls('Follow the guide to activate access and start browsing offers.', 'اتبع الدليل لتفعيل الوصول والبدء بتصفح العروض.'),
    ],
  },
  {
    id: 'cybersecurity-basics',
    title: ls('Cybersecurity Basics', 'أساسيات الأمن السيبراني'),
    description: ls('Follow the essential cybersecurity practices for safe work.', 'اتبع أساسيات الأمن السيبراني للعمل بأمان.'),
    category: 'IT',
    steps: [
      ls('Use strong and unique passwords and change them regularly (every 90 days).', 'استخدم كلمات مرور قوية وفريدة وغيّرها بانتظام (كل 90 يومًا).'),
      ls('Avoid opening unknown links/attachments and verify senders.', 'تجنب فتح الروابط/المرفقات غير المعروفة وتحقق من المرسلين.'),
      ls('Do not install software without IT approval and report suspicious activity.', 'لا تثبّت برامج دون موافقة تقنية المعلومات وبلّغ عن أي نشاط مشبوه.'),
    ],
  },
]
