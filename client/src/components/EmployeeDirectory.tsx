import { useEffect } from 'react'
import { IconBuilding, IconMail, IconPhone, IconSearch, IconUser, IconUsers } from '@tabler/icons-react'
import { useI18n } from '../i18n/i18n'

interface Employee {
  empId: number
  nameAr: string
  nameEn: string
  positionAr: string
  positionEn: string
  department: string
  division: string
  region: string
  email: string
  mobile: string
}

interface Props {
  input?: {
    searchQuery?: string
    filters?: {
      department?: string
      region?: string
      division?: string
    }
    employees?: Employee[]
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const EMPTY_EMPLOYEES: Employee[] = []

export function EmployeeDirectory({ input, toolName, toolCallId, addToolResult }: Props) {
  const { t, locale } = useI18n()
  const employees = input?.employees ?? EMPTY_EMPLOYEES;
  const searchQuery = input?.searchQuery || '';
  const filters = input?.filters;

  const visibleEmployees = employees.slice(0, 12);
  const activeFilters: Array<{ label: string; value: string }> = [];
  if (filters?.department) activeFilters.push({ label: t('common.department'), value: filters.department });
  if (filters?.division) activeFilters.push({ label: t('common.division'), value: filters.division });
  if (filters?.region) activeFilters.push({ label: t('common.region'), value: filters.region });
  
  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          employeeCount: employees.length,
          searchQuery: searchQuery,
          filters: filters,
          employees: employees,
          message: `Showing ${employees.length} employee(s)`
        }
      });
    }
  }, [employees, searchQuery, filters, toolName, toolCallId, addToolResult]);
  return (
    <div className="max-w-5xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
            <IconUsers className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">{t('common.employeeDirectory')}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('common.employeeDirectoryAr')}</p>
          </div>
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-[#002855] dark:text-white">{employees.length}</span> {t('common.employees')}
          <span className="text-slate-400 dark:text-slate-500"> · </span>
          {t('common.showing')} {Math.min(visibleEmployees.length, employees.length)}
        </div>
      </div>

      <div className="mt-5">
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-3 rtl:left-auto rtl:right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#002855]/50 dark:text-white/60" />
          <input
            type="text"
            placeholder={t('common.searchEmployees')}
            value={searchQuery}
            readOnly
            className="w-full rounded-2xl border border-[#002855]/10 bg-white px-4 py-3 pl-11 rtl:pl-4 rtl:pr-11 text-sm text-slate-900 outline-none ring-0 shadow-sm motion-safe:transition-all motion-safe:duration-200 focus:border-[#E1523E]/45 focus:shadow-[0_0_0_4px_rgba(225,82,62,0.18)] dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-100 dark:focus:shadow-[0_0_0_4px_rgba(225,82,62,0.12)]"
          />
        </div>

        {(searchQuery || activeFilters.length > 0) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {searchQuery && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E1523E]/20 bg-white/80 px-3 py-1 text-xs font-medium text-[#002855] shadow-sm motion-safe:transition-colors dark:border-[#E1523E]/25 dark:bg-slate-950/35 dark:text-white">
                {t('common.searchLabel')}: <span className="font-semibold">{searchQuery}</span>
              </span>
            )}
            {activeFilters.map((f) => (
              <span
                key={`${f.label}:${f.value}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#002855]/10 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm motion-safe:transition-all motion-safe:duration-200 hover:border-[#E1523E]/25 hover:bg-[#E1523E]/5 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200 dark:hover:border-[#E1523E]/30 dark:hover:bg-[#E1523E]/10"
              >
                <span className="text-slate-500 dark:text-slate-400">{f.label}:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{f.value}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        {employees.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#002855]/20 bg-white/80 p-10 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/25">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#002855]/15 to-[#E1523E]/15 text-[#002855] dark:from-[#002855]/35 dark:to-[#E1523E]/25 dark:text-white">
              <IconUser className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm font-semibold text-[#002855] dark:text-white">{t('common.noEmployees')}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('common.adjustSearch')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {visibleEmployees.map((emp) => (
              <div
                key={emp.empId}
                className="group rounded-2xl border border-[#002855]/10 bg-white p-4 shadow-sm motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md hover:border-[#E1523E]/25 dark:border-white/10 dark:bg-slate-950/35 dark:hover:border-[#E1523E]/30"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#002855] to-[#E1523E] text-sm font-semibold text-white motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.03]">
                    {(emp.nameEn || emp.nameAr || '?').trim().charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {locale === 'ar' ? emp.nameAr : emp.nameEn}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                      {locale === 'ar' ? emp.nameEn : emp.nameAr}
                    </p>
                    <p className="mt-2 truncate text-xs font-medium text-slate-700 dark:text-slate-300">
                      {locale === 'ar' ? emp.positionAr : emp.positionEn}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                      {locale === 'ar' ? emp.positionEn : emp.positionAr}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#002855]/10 bg-[#002855]/5 px-2.5 py-1 text-xs text-[#002855] motion-safe:transition-colors dark:border-white/10 dark:bg-white/5 dark:text-white">
                        <IconBuilding className="h-3.5 w-3.5 text-[#002855]/70 dark:text-white/70" />
                        <span className="truncate">{emp.department}</span>
                      </span>
                      {emp.division && (
                        <span className="inline-flex items-center rounded-full border border-[#002855]/10 bg-white px-2.5 py-1 text-xs text-slate-700 motion-safe:transition-colors hover:border-[#E1523E]/25 hover:bg-[#E1523E]/5 dark:border-white/10 dark:bg-slate-950/20 dark:text-slate-200 dark:hover:bg-[#E1523E]/10">
                          {emp.division}
                        </span>
                      )}
                      {emp.region && (
                        <span className="inline-flex items-center rounded-full border border-[#002855]/10 bg-white px-2.5 py-1 text-xs text-slate-700 motion-safe:transition-colors hover:border-[#E1523E]/25 hover:bg-[#E1523E]/5 dark:border-white/10 dark:bg-slate-950/20 dark:text-slate-200 dark:hover:bg-[#E1523E]/10">
                          {emp.region}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <IconMail className="h-4 w-4 text-[#002855]/45 dark:text-white/55" />
                        <a
                          href={emp.email ? `mailto:${emp.email}` : undefined}
                          className="min-w-0 truncate text-slate-600 hover:text-[#E1523E] hover:underline dark:text-slate-300 dark:hover:text-white"
                        >
                          {emp.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <IconPhone className="h-4 w-4 text-[#002855]/45 dark:text-white/55" />
                        <a
                          href={emp.mobile ? `tel:${emp.mobile}` : undefined}
                          className="text-slate-600 hover:text-[#E1523E] hover:underline dark:text-slate-300 dark:hover:text-white"
                        >
                          {emp.mobile}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {employees.length > visibleEmployees.length && (
        <div className="mt-6 rounded-2xl border border-[#002855]/10 bg-white/70 px-4 py-3 text-center text-sm text-slate-600 shadow-sm dark:border-white/10 dark:bg-slate-950/35 dark:text-slate-300">
          {t('common.showing')} {visibleEmployees.length} {t('common.of')} {employees.length} {t('common.employees')}
        </div>
      )}
    </div>
  )
}
