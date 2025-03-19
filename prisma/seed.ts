import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Hash passwords
    const passwordHash = await bcrypt.hash('123456', 10);

    // Create users
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            name: 'Admin User',
            email: 'admin@example.com',
            password: passwordHash,
        },
    });

    const adminUserRoles = await prisma.userRole.create({
        data: {
            role: 'ADMIN',
            userId: adminUser.id
        }
    })

    const teacherUser = await prisma.user.upsert({
        where: { email: 'teacher01@example.com' },
        update: {},
        create: {
            name: 'Teacher 01',
            email: 'teacher@example.com',
            password: passwordHash,
        },
    });

    // Create teachers
    const teacher = await prisma.teacher.upsert({
        where: { email: 'teacher01@example.com' },
        update: {},
        create: {
            name: 'Teacher 01',
            email: 'teacher01@example.com',
        },
    });

    // Create a course
    const course = await prisma.course.create({
        data: { 
            name: 'Informática II',
            abbreviation: 'INFII'
         }
    });

    // Create subjects
    const subject01 = await prisma.subject.create({
        data: {
            name: 'Lógica de Programação',
            abbreviation: 'LP',
            courseId: course.id
        }
    });

    const subject02 = await prisma.subject.create({
        data: {
            name: 'Lógica de Programação',
            abbreviation: 'LP',
            courseId: course.id
        }
    });

    // Create a schedule
    await prisma.schedule.create({
        data: {
            teacherId: teacher.id,
            subjectId: subject01.id,
            courseId: course.id,
            dayOfWeek: 1, // Monday
            startTime: '08:00',
            endTime: '10:00',
        },
    });

    console.log('Seeding complete!');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
