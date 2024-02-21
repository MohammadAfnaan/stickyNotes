const notesContiner = document.getElementById("app");
const addNoteButton = notesContiner.querySelector(".add-note");

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id,note.content);
    notesContiner.insertBefore(noteElement,addNoteButton);
});
addNoteButton.addEventListener('click',  addNote);
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}
function saveNotes(notes){
    localStorage.setItem("stickynotes-notes",JSON.stringify(notes));
}
function createNoteElement(id,content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.setAttribute("data-id", id);
    element.value= content;
    element.placeholder="Enter your text here...";
    element.addEventListener("change", () => {
        updatenote(id,element.value);
    });
    element.addEventListener( "dblclick" , ()=>{ 
        const doDelete = confirm(
            "Are you   sure?\nThis action cannot be undone."
        );
        if (doDelete) {
            deleteNote(id,element);
        }
    });
    
    return element;
}
function addNote() {
    const notes = getNotes();
    const noteObject  = {
        id: Math.floor(Math.random() * 1000000),
        content:""
    };
    const noteElement = createNoteElement(noteObject.id,noteObject.content);
    notesContiner.insertBefore(noteElement,addNoteButton);
    notes.push(noteObject);
    saveNotes(notes);
}
function updatenote(id, newContent){
    const  notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];
    targetNote.content = newContent;
    saveNotes(notes);
}
function deleteNote(id,element){
    const notes = getNotes().filter((note) => note.id != id);
    saveNotes(notes);
    notesContiner.removeChild(element);
}