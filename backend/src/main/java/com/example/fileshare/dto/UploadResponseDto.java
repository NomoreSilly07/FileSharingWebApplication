package com.example.fileshare.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UploadResponseDto {
    private UUID uuid;
    private String fileName;
    private Long size;
    private String downloadUrl;
}
