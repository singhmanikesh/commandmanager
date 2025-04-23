package com.manikesh.datastruct.service;

import com.manikesh.datastruct.entity.Command;
import com.manikesh.datastruct.repository.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Stack;

@Service
public class CommandService {

    private final Repository repository;
   //private final Stack<String> commandStack = new Stack<>();
    private final Stack<String> undoStack = new Stack<>();
    private final Stack<String> redoStack = new Stack<>();


    public String peekUndo() {
        if (undoStack.isEmpty()) {
            return "Nothing to undo";
        }
        return undoStack.peek();
    }

    public String peekRedo() {
        if (redoStack.isEmpty()) {
            return "Nothing to redo";
        }
        return redoStack.peek();
    }

    public CommandService(Repository repository) {
        this.repository = repository;
    }

    public void addCommand(String input){
        //commandStack.push(input);
        undoStack.push(input);
        Command cmd = new Command();
        cmd.setCommand(input);
        cmd.setTimestamp(LocalDateTime.now());
        repository.save(cmd);
    }

    public String undoCommand(){
        if(!undoStack.isEmpty()){
            String undone =  undoStack.pop();
            redoStack.push(undone);
            return undone;

        }
        return null;
    }

    public String redoCommand(){
        if(!redoStack.isEmpty()){
            String done =  redoStack.pop();
            undoStack.push(done);
            return done;

        }
        return null;
    }

    public void deletefromdb(){
        repository.deleteAll();
    }

    public List<Command> getAllCommand(){
        return repository.findAll();
    }

    public  List<Command> search(String keyword){
        return repository.findByCommandContainingIgnoreCase(keyword);
    }

}
