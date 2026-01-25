import { EmployeeDirectory } from '../components/EmployeeDirectory'
import { useI18n } from '../i18n/i18n'

export function EmployeesPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('employees.title')}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('employees.subtitle')}</p>
      </div>

      <EmployeeDirectory
        input={{
          searchQuery: '',
          filters: {},
          employees: [
            {
              empId: 1001,
              nameAr: 'علي أحمد',
              nameEn: 'Ali Ahmed',
              positionAr: 'مهندس برمجيات',
              positionEn: 'Software Engineer',
              department: 'Engineering',
              division: 'Digital',
              region: 'Riyadh',
              email: 'ali.ahmed@tetco.sa',
              mobile: '+966500000001',
            },
            {
              empId: 1002,
              nameAr: 'سارة محمد',
              nameEn: 'Sara Mohammed',
              positionAr: 'محلل نظم',
              positionEn: 'Systems Analyst',
              department: 'Engineering',
              division: 'Digital',
              region: 'Riyadh',
              email: 'sara.mohammed@tetco.sa',
              mobile: '+966500000002',
            },
            {
              empId: 1003,
              nameAr: 'خالد الدوسري',
              nameEn: 'Khalid Al Dosari',
              positionAr: 'أخصائي موارد بشرية',
              positionEn: 'HR Specialist',
              department: 'HR',
              division: 'People',
              region: 'Riyadh',
              email: 'khalid.aldosari@tetco.sa',
              mobile: '+966500000003',
            },
            {
              empId: 1004,
              nameAr: 'نجد العتيبي',
              nameEn: 'Najd Al Otaibi',
              positionAr: 'أخصائي اتصال مؤسسي',
              positionEn: 'Corporate Communications Specialist',
              department: 'Corporate Communication',
              division: 'Communications',
              region: 'Riyadh',
              email: 'najd.alotaibi@tetco.sa',
              mobile: '+966500000004',
            },
            {
              empId: 1005,
              nameAr: 'عبدالمجيد العثمان',
              nameEn: 'Abdulmajid Al Othman',
              positionAr: 'مستشار قانوني',
              positionEn: 'Legal Counsel',
              department: 'Legal',
              division: 'Legal',
              region: 'Riyadh',
              email: 'abdulmajid.othman@tetco.sa',
              mobile: '+966500000005',
            },
          ],
        }}
      />
    </div>
  )
}
