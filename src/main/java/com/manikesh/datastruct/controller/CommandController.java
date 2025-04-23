package com.manikesh.datastruct.controller;


import com.manikesh.datastruct.entity.Command;
import com.manikesh.datastruct.service.CommandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commands")
public class CommandController {
    private final CommandService commandService;


    public CommandController(CommandService commandService) {
        this.commandService = commandService;
    }

    @PostMapping
    public ResponseEntity<String> addCommand(@RequestBody String input){
        commandService.addCommand(input);
        return ResponseEntity.ok("Command added");
    }

    @DeleteMapping("/undo")
    public String undoLast(){
        return commandService.undoCommand();
    }

    @DeleteMapping("/deleteall")
    public void delete(){
        commandService.deletefromdb();
    }

    @DeleteMapping("/redo")
    public String redoLast(){
        return commandService.redoCommand();
    }

    @GetMapping("/peekundo")
    public String peekUndo() {
        return commandService.peekUndo();
    }
    @GetMapping("/peekredo")
    public String peekRndo() {
        return commandService.peekRedo();
    }


    @GetMapping
    public List<Command> getAll() {
        return commandService.getAllCommand();
    }

    @GetMapping("/search")
    public List<Command> search(@RequestParam String q) {
        return commandService.search(q);
    }
}
