//import { Curriculum, Module } from '../language/generated/ast.js';
import { Curriculum} from '../language/generated/ast.js';
import { createModulLandKarteServices } from '../language/modul-land-karte-module.js';
import { AstNode, EmptyFileSystem, LangiumServices } from 'langium';
import { URI } from 'vscode-uri';

/**
 * Parses current Curriculum on the Langium side & generates output as a list of Objects
 * @param CurriculumData to parse
 * @returns Generated Curriculum
 */
export async function parseAndGenerate(CurriculumData: string): Promise<Object[]> {
    const services = createModulLandKarteServices(EmptyFileSystem).ModulLandKarte;
    const model = await extractAstNodeFromString<Curriculum>(CurriculumData, services);
    // generate commands from the model
    console.log('Hello hier ist parseAndGenerate!');
    console.log('Das Model:', model);
    //const cmds = generateCurriculumObject(model);
    //console.log('Die Commands:', cmds);

    return [model];
}
/*
interface SimplifiedModule {
    name: string;
    officialID: string;
    shortName: string;
    officialName: string;
    semester: number;
    etcs: number;
}

interface SimplifiedCurriculum {
    name: string;
    type: string;
    displayShortName: string;
    fullName: string;
    status: string;
    noSemesters: number;
    modules: SimplifiedModule[];

}
*/
/**
 * Generates a simplified curriculim from the AST
 * @param curriculum The curriculum ast-node which is going to be processed
 * @returns simplified curriculum object
 */
/*function generateCurriculumObject(curriculum: Curriculum): SimplifiedCurriculum {
    const result: SimplifiedCurriculum = {
        name: curriculum.name,
        type: curriculum.type.val, 
        displayShortName: curriculum.displayShortName,
        fullName: curriculum.fullName,
        status: curriculum.status.val, 
        noSemesters: curriculum.noSemesters,
        modules: curriculum.modules.map((module: Module): SimplifiedModule => ({
            name: module.name,
            officialID: module.officialID,
            shortName: module.shortName,
            officialName: module.officialName,
            semester: module.semester,
            etcs: module.etcs,

        })),
       
    };

    return result;
}
*/
/**
 * Extracts an AST node from a virtual document, represented as a string
 * @param content Content to create virtual document from
 * @param services For constructing & building a virtual document
 * @returns A promise for the parsed result of the document
 */
async function extractAstNodeFromString<T extends AstNode>(content: string, services: LangiumServices): Promise<T> {
    const doc = services.shared.workspace.LangiumDocumentFactory.fromString(content, URI.parse('memory://sudoku.document'));
    await services.shared.workspace.DocumentBuilder.build([doc]);
    return doc.parseResult?.value as T;
}