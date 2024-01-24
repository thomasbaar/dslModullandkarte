grammar ModulLandKarte

entry Model:
    'model' name=ID
    curriculums+=Curriculum*;

Curriculum:
    'curriculum' name=ID   //unique id; e.g. ce_ba
    //
    //TODO: make the ordering of the following attributes flexible ?!
    //
    'type' type=CurriculumType 
    'displayShortName' displayShortName=STRING
    'fullName' fullName=STRING
    'status' status=CurriculumStatus
    'noSemesters' noSemesters=INT
    ('poNumber' poNumber=ID)?
    ('url' url=STRING)? 
    ('remark' remark=STRING)?
    // ordering of following information is arbitrary
    (  modules+=Module 
     | suppInfo+=SupplementaryCurriculumInformation
     | topics+=ModuleTopic
    )*
;    


CurriculumType: val=('bachelor' | 'master');

CurriculumStatus: val=('planned' | 'running' | 'ending' | 'archived' );

Module:
    'module' name=ID //mnemonic ID, e.g. ma1
    'officialID' officialID=STRING
    'shortName' shortName=STRING
    'officialName' officialName=STRING
    'semester' semester=INT
    'etcs' etcs=INT
    ('workingHoursSL' workingHourSL=INT)?
    ('workingHoursBUE' workingHoursBUE=INT)?
    ('workingHoursPUE' workingHoursPUE=INT)?
    ('workingHoursPCUE' workingHoursPCUE=INT)?
    ('workingHoursLPr' workingHoursLPr=INT)?
    ('workingHoursPS' workingHoursPS=INT)?
;    

SupplementaryCurriculumInformation:
    'supplementaryCurriculumInformation'
    //TODO: make the ordering more flexible !
    los=LearningOutcomeSection?
    mos=MandatoryOptionalSection?
    ps=PrerequisiteSection?
//    mts=ModuleTopicSection?
;

LearningOutcomeSection:
    'learningOutcomeSection'
    outcomes+=LearningOutcome*
;

LearningOutcome:
    module=[Module] val=STRING
;    


MandatoryOptionalSection:
    'mandatoryOptionalSection'
    moFlags+=MandatoryOrOptional*
;

MandatoryOrOptional:
    module=[Module] kind=MandatoryOrOptionalKind
;    

MandatoryOrOptionalKind: val=('pflicht' | 'wahlpflicht');



PrerequisiteSection:
    'prerequisiteSection'
    prerequisites+=Prerequisite*
;

Prerequisite:
    predec=[Module] '->' succ=[Module] kind=PrerequisiteKind 
//    ('topics' ':' topics+=[ModuleTopic:QualifiedName]*)?  //TODO: instead of QualifiedName better use ScopeProvider 
 //   ('topics' ':' topics+=[ModuleTopic:ID]*)?  //TODO: instead of QualifiedName better use ScopeProvider 
    ('topics' ':' tpl=TopicList)?  //TODO: instead of QualifiedName better use ScopeProvider 
;  

TopicList:
    topics+=[ModuleTopic:ID] (',' topics+=[ModuleTopic:ID])*  // TODO: comma is necessary due to grammar reasons
;    

PrerequisiteKind: val=('necessary' | 'recommended');

/*
//TODO: Make it possible with scope provider
ModuleTopicSection:
    'moduleTopicSection' name=ID //TODO: name is poor man
    topics+=ModuleTopic*
;
*/
ModuleTopic:
 'mt'   module=[Module]  name=ID ':' keywords += STRING*
; 

/*
QualifiedName returns string:
    ID ('.' ID)*
;    
*/

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
