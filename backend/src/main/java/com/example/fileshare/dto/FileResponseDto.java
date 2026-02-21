package com.example.fileshare.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class FileResponseDto {
    private String fileName;
    private Long size;
    private String type;
    private LocalDateTime uploadDate;
    private Integer downloadCount;
}
