import { defineStore } from 'pinia';

function extractCurriculumData(ast) {
    if (!ast || ast.length === 0 || !ast[0].curriculums || ast[0].curriculums.length === 0) {
        return null;
    }

    const curriculum = ast[0].curriculums[0];
    const extractedSuppInfo = curriculum.suppInfo.map(supp => {
        return supp.ps ? supp.ps.prerequisites.map(prereq => ({
            predec: prereq.predec.$refText,
            succ: prereq.succ.$refText
        })) : [];
    }).flat(); 

    return {
        name: curriculum.name,
        displayShortName: curriculum.displayShortName,
        fullName: curriculum.fullName,
        noSemesters: curriculum.noSemesters,
        modules: curriculum.modules.map(mod => ({
            name: mod.name,
            officialID: mod.officialID,
            shortName: mod.shortName,
            officialName: mod.officialName,
            semester: mod.semester,
            etcs: mod.etcs
        })),
        suppInfo: extractedSuppInfo
    };
}

export const useAstStore = defineStore('ast', {
    state: () => ({
        curriculumData: null
    }),
    actions: {
        setCurriculumData(ast) {
            this.curriculumData = extractCurriculumData(ast);
        }
    }
});
