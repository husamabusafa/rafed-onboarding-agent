# Bilingual Support (Arabic/English) - حياك System

This document outlines the comprehensive bilingual support implemented throughout the RAFED onboarding system database and seed data.

## Overview

The system provides full Arabic and English support across all user-facing content, enabling seamless experiences for both Arabic and English speakers.

## Database Schema - Bilingual Fields

### Employee Management
- **Employee**: `nameAr`, `nameEn`, `positionAr`, `positionEn`
- **Region**: `nameAr`, `nameEn`
- **Division**: `nameAr`, `nameEn`
- **Department**: `nameAr`, `nameEn`

### Cafeteria & Amenities
- **MenuCategory**: `nameAr`, `nameEn`
- **MenuItem**: `nameAr`, `nameEn`, `descriptionAr`, `descriptionEn`

### Calendar
- **Holiday**: `nameAr`, `nameEn`

### Onboarding
- **OnboardingTask**: `taskAr`, `taskEn`
- **OrientationWorkshop**: `titleAr`, `titleEn`, `descriptionAr`, `descriptionEn`
- **ProbationMilestone**: `nameAr`, `nameEn` *(newly added)*

### Internal Resources
- **InternalContact**: `departmentAr`, `departmentEn`

## Seed Data Coverage

### Employees (5 Sample Records)
- Ahmed Mohammed Al-Salem (أحمد محمد السالم) - Software Development Manager
- Fatima Abdullah Al-Harbi (فاطمة عبدالله الحربي) - Recruitment & Development Manager
- Mohammed Saad Al-Otaibi (محمد سعد العتيبي) - Accounting Manager
- Sarah Khaled Al-Qahtani (سارة خالد القحطاني) - Software Developer
- Abdulrahman Ali Al-Shehri (عبدالرحمن علي الشهري) - HR Analyst

### Organizational Structure
**Regions (5):**
- المقر الرئيسي / Head Office (HO)
- الرياض / Riyadh (RYD)
- مكة / Makkah (MKH)
- المدينة / Madinah (MDN)
- الشرقية / Eastern (EST)

**Divisions (4):**
- تقنية المعلومات / Information Technology
- الموارد البشرية / Human Resources
- المالية / Finance
- العمليات / Operations

**Departments (3):**
- تطوير البرمجيات / Software Development
- التوظيف والتطوير / Recruitment & Development
- المحاسبة / Accounting

### Cafeteria Menu

**الشاي والأعشاب / Teas & Herbal Infusions:**
- شاي أخضر / Green Tea
- شاي بالنعناع / Mint Tea
- شاي بالزنجبيل / Ginger Tea
- شاي باليانسون / Anise Tea

**القهوة / Coffee:**
- قهوة عربية / Arabic Coffee
- كابتشينو / Cappuccino
- لاتيه / Latte
- إسبريسو / Espresso

**العصائر والمشروبات الباردة / Juices & Cold Drinks:**
- عصير برتقال طازج / Fresh Orange Juice
- عصير المانجو / Mango Juice
- ليمون بالنعناع / Lemon Mint
- قهوة باردة / Iced Coffee

### Company Holidays (5)
- رأس السنة / New Year (Jan 1)
- يوم التأسيس / Founding Day (Feb 22)
- عيد الفطر / Eid Al-Fitr (Mar 31 - Apr 3)
- عيد الأضحى / Eid Al-Adha (Jun 8-11)
- اليوم الوطني / National Day (Sep 23)

### Onboarding Tasks
All tasks include both Arabic and English descriptions:
- استلام بطاقة الهوية / Receive ID Badge
- إعداد البريد الإلكتروني / Email Setup
- حضور ورشة التوجيه / Attend Orientation Workshop
- إرسال الوثائق المطلوبة / Submit Required Documents
- إكمال الفحص الطبي / Complete Medical Examination
- إعداد خطة التطوير / Set Up Development Plan

### Probation Milestones
- إكمال التدريب الأساسي / Complete Basic Training
- مراجعة الأداء الأولى / First Performance Review
- إنجاز المشروع التدريبي / Complete Training Project
- فهم العمليات الرئيسية / Understand Core Processes

### Internal Contacts (2 Departments)
- تقنية المعلومات / IT Support
- الموارد البشرية / Human Resources

### Orientation Workshop
- التوجيه للموظفين الجدد / New Employee Orientation

## Implementation Details

### Schema Changes
1. Added `nameAr` and `nameEn` fields to `ProbationMilestone` model
2. Migration created: `20260115065113_add_bilingual_fields_to_probation_milestone`

### Seed Data Enhancements
1. Expanded employee records from 3 to 5 with diverse roles and stages
2. Added 4 new tea varieties (Ginger, Anise)
3. Added 2 new coffee options (Latte, Espresso)
4. Created new juice category with 4 cold drink options
5. Added 2 additional national holidays (Eid Al-Adha, New Year)
6. Expanded onboarding tasks to cover all stages
7. Added comprehensive probation milestones

## Frontend Integration

The client-side application uses the `i18n` system (see `client/src/i18n/`) to display bilingual content:
- Components receive both `nameAr` and `nameEn` from the API
- The active locale determines which field to display
- Users can toggle between Arabic (العربية) and English using the language switcher

## API Response Format

All API endpoints return bilingual data:

```json
{
  "id": 1,
  "nameAr": "أحمد محمد السالم",
  "nameEn": "Ahmed Mohammed Al-Salem",
  "positionAr": "مدير تطوير البرمجيات",
  "positionEn": "Software Development Manager"
}
```

## Testing Bilingual Support

1. **Database**: Use Prisma Studio to view bilingual data
   ```bash
   cd server && npm run prisma:studio
   ```

2. **API**: Test endpoints with tools like Postman or curl
   ```bash
   curl http://localhost:3001/employees
   ```

3. **Frontend**: Toggle language in the UI and verify all content switches correctly

## Best Practices

1. **Always populate both fields**: Never leave `nameAr` or `nameEn` empty
2. **Consistent naming**: Use the pattern `fieldAr` and `fieldEn` for all bilingual fields
3. **Quality translations**: Ensure Arabic translations are natural and contextually appropriate
4. **RTL Support**: The frontend automatically handles RTL layout when Arabic is selected
5. **Validation**: Both language fields should be required at the database level

## Future Enhancements

Consider adding bilingual support to:
- Error messages and validation messages
- System notifications
- Email templates
- Report generation
- Export file headers

---

Last Updated: January 15, 2026
