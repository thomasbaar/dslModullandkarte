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
    ('remark' remark=STRING)?
    // ordering of following information is arbitrary
    (modules+=Module | suppInfo+=SupplementaryCurriculumInformation)*
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
;    

PrerequisiteKind: val=('necessary' | 'recommended');





hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
