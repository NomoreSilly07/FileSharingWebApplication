package com.example.fileshare.service;

import com.example.fileshare.dto.FileResponseDto;
import com.example.fileshare.dto.UploadResponseDto;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface FileService {
    UploadResponseDto uploadFile(MultipartFile file);
    Resource downloadFile(UUID uuid);
    FileResponseDto getFileMetadata(UUID uuid);
}
