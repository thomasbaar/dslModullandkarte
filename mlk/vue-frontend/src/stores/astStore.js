import { defineStore } from 'pinia';

function extractCurriculumData(ast) {
    if (!ast || ast.length === 0 || !ast[0].curriculums || ast[0].curriculums.length === 0) {
        return null;
    }

    const curriculum = ast[0].curriculums[0];
    const moduleDescriptions = {};

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

    // URL extrahieren
    const url = curriculum.url;

    // Extraktion der Modulbeschreibungen aus der suppInfo
    if (curriculum.suppInfo && curriculum.suppInfo.length > 1) {
        curriculum.suppInfo[1].los.outcomes.forEach(outcome => {
            if (outcome.module && outcome.module.$refText && outcome.val) {
                moduleDescriptions[outcome.module.$refText] = outcome.val.trim();
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
            description: moduleDescriptions[mod.name] || '',
            topics: moduleTopics[mod.name] || []  // Hinzufügen der Themen zu jedem Modul
        };
    });

    return {
        name: curriculum.name,
        displayShortName: curriculum.displayShortName,
        fullName: curriculum.fullName,
        noSemesters: curriculum.noSemesters,
        url: url,
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
