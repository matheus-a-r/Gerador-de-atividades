const PROMPT_PART_1 = `
    Generate the structure of a school activity to help students learn.
    The activity must contain a layout structure where texts, images, tables or any other element that can help students' learning are positioned. 
    These elements must be arranged in such a way that they are consistent with the proposed question. For example: if the question asks the student to link images, the images must be separated in such a way that it is possible for the student to link them.
    The structure of the activity must be specified using the HTML language, and the CSS language to position text, images, tables, or any element present in the activity.
    If the activity contains images, add a description of the image in the “alt” attribute. This description must be consistent with the activity specification and provide all the information necessary for the student to be able to answer the activity.
    Also add an explanation for the elements used in the activity, in a new “exp” attribute. This attribute must be specified within the HTML tags and will explain the purpose of that structure in the activity. 
    When it is necessary to use CSS, add an explanation in the form of comments above the class. This CSS is used to organize the layout of the activity so that it is creative and fun for the student.
    Generate a textual description of the activity. This description must be specified in JSON format and must contain the following attributes:

    task: the objective of the question, what the student will learn by answering.
    layout: a detailed description of how each html elements are organized in the layout of the question, explain where the elements are placed.
    answer: what the student will have to do to correctly answer that activity, add the answer and all the infos needed to answer the question

    Generate the JSON description, and then generate the HTML structure containing the layout.
    Do not generate iteractive HTML, this activitie is intended to be resolved with a pen and paper.
    Be careful that the size of the images does not exceed the size of the activity

    To generate a new activity use the following parameters:
    `

const PROMPT_PART_2 = `
    Where:
    
    level: is the school year is that activity intended for.
    subject: is the school subject that activity is designed for.
    theme: is the topic that activity wants to work on.
    sheet width: is the desired width of the activity sheet.
    task: is what the student must do to answer the activity.
    
    Stick to the following rules:
    
    Don't add anything outside the textual description and the HMTL of the activity.
    Generate an activity that is creative and helps the student learn in a playful way, using the parameters specified above.
    `

export const PROMPT = `
    ${PROMPT_PART_1}

    <parameters>

    ${PROMPT_PART_2}
`