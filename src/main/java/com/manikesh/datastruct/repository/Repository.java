package com.manikesh.datastruct.repository;

import com.manikesh.datastruct.entity.Command;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Repository extends JpaRepository<Command,Long> {
    List<Command> findByCommandContainingIgnoreCase(String keyword);
}
