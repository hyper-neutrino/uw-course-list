import api from "$lib/api.js";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ params }) => {
    const ids = new Set(await api(`/classschedules/${params.term}`));

    return {
        term: params.term,
        subjects: (await api(`/subjects`)).reduce((o: any, x: any) => ({ ...o, [x.code]: x.description }), {}),
        courses: (await api(`/courses/${params.term}`))
            .filter((x: any) => ids.has(x.courseId))
            .map((x: any) => ({
                id: x.courseId,
                career: x.associatedAcademicCareer,
                group: x.associatedAcademicGroupCode,
                org: x.associatedAcademicOrgCode,
                subject: x.subjectCode,
                code: x.catalogNumber,
                name: x.title,
                description: x.description,
                grading: x.gradingBasis,
                component: x.courseComponentCode,
                enrollConsent: x.enrollConsentCode,
                dropConsent: x.dropConsentCode,
                reqs: x.requirementsDescription,
            }))
            .filter((x: any) => x.code.match(/\d+/))
            .sort((x: any, y: any) => x.subject.localeCompare(y.subject) || x.code.localeCompare(y.code)),
        orgs: (await api(`/academicorganizations`)).reduce(
            (o: any, x: any) => ({ ...o, [x.code]: x.descriptionFormal }),
            {},
        ),
    };
};
