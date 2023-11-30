import { defineStore } from 'pinia';

function extractCurriculumData(ast) {
    if (!ast || ast.length === 0 || !ast[0].curriculums || ast[0].curriculums.length === 0) {
        return null;
    }

    const curriculum = ast[0].curriculums[0];

    // Extraktion der Modulthemen
    const moduleTopics = {};
    if (curriculum.topics) {
        curriculum.topics.forEach(topic => {
            if (topic.module && topic.module.$refText && topic.name) {
                if (!moduleTopics[topic.module.$refText]) {
                    moduleTopics[topic.module.$refText] = [];
                }
                moduleTopics[topic.module.$refText].push({
                    topicName: topic.name,
                    keywords: topic.keywords || []
                });
            }
        });
    }

    // Extraktion der Prerequisites mit Topics
    const extractedSuppInfo = curriculum.suppInfo.map(supp => {
        const prereqsWithTopics = supp.ps ? supp.ps.prerequisites.map(prereq => {
            return {
                predec: prereq.predec.$refText,
                succ: prereq.succ.$refText,
                topics: prereq.tpl ? prereq.tpl.topics.map(topic => topic.$refText) : []
            };
        }) : [];
        return prereqsWithTopics;
    }).flat();

    // Extraktion der Modulinformationen
    const extractedModules = curriculum.modules.map(mod => {
        return {
            name: mod.name,
            officialID: mod.officialID,
            shortName: mod.shortName,
            officialName: mod.officialName,
            semester: mod.semester,
            etcs: mod.etcs,
            topics: moduleTopics[mod.name] || []  // Hinzufügen der Themen zu jedem Modul
        };
    });

    return {
        name: curriculum.name,
        displayShortName: curriculum.displayShortName,
        fullName: curriculum.fullName,
        noSemesters: curriculum.noSemesters,
        modules: extractedModules,
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
