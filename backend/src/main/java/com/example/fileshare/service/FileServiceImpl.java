package com.example.fileshare.service;

import com.example.fileshare.dto.FileResponseDto;
import com.example.fileshare.dto.UploadResponseDto;
import com.example.fileshare.entity.FileEntity;
import com.example.fileshare.exception.FileNotFoundException;
import com.example.fileshare.exception.FileStorageException;
import com.example.fileshare.repository.FileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;
    private final Path fileStorageLocation;

    public FileServiceImpl(FileRepository fileRepository, @Value("${file.upload-dir}") String uploadDir) {
        this.fileRepository = fileRepository;
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @Override
    public UploadResponseDto uploadFile(MultipartFile file) {
        String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        
        try {
            if(originalFileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + originalFileName);
            }

            // Generate unique stored filename to prevent collisions, or just use UUID
            String storedFileName = UUID.randomUUID() + "_" + originalFileName;
            Path targetLocation = this.fileStorageLocation.resolve(storedFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            FileEntity fileEntity = FileEntity.builder()
                    .originalFileName(originalFileName)
                    .storedFileName(storedFileName)
                    .fileSize(file.getSize())
                    .contentType(file.getContentType())
                    .uploadDate(LocalDateTime.now())
                    .downloadCount(0)
                    .build();

            FileEntity savedFile = fileRepository.save(fileEntity);

            String downloadUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/files/")
                    .path(savedFile.getId().toString())
                    .toUriString();

            return UploadResponseDto.builder()
                    .uuid(savedFile.getId())
                    .fileName(savedFile.getOriginalFileName())
                    .size(savedFile.getFileSize())
                    .downloadUrl(downloadUrl)
                    .build();

        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + originalFileName + ". Please try again!", ex);
        }
    }

    @Override
    public Resource downloadFile(UUID uuid) {
        FileEntity fileEntity = fileRepository.findById(uuid)
                .orElseThrow(() -> new FileNotFoundException("File not found with id " + uuid));

        try {
            Path filePath = this.fileStorageLocation.resolve(fileEntity.getStoredFileName()).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if(resource.exists()) {
                // Increment download count
                fileEntity.setDownloadCount(fileEntity.getDownloadCount() + 1);
                fileRepository.save(fileEntity);
                
                return resource;
            } else {
                throw new FileNotFoundException("File not found " + fileEntity.getOriginalFileName());
            }
        } catch (MalformedURLException ex) {
            throw new FileNotFoundException("File not found " + fileEntity.getOriginalFileName(), ex);
        }
    }

    @Override
    public FileResponseDto getFileMetadata(UUID uuid) {
         FileEntity fileEntity = fileRepository.findById(uuid)
                .orElseThrow(() -> new FileNotFoundException("File not found with id " + uuid));
         
         return FileResponseDto.builder()
                 .fileName(fileEntity.getOriginalFileName())
                 .size(fileEntity.getFileSize())
                 .type(fileEntity.getContentType())
                 .uploadDate(fileEntity.getUploadDate())
                 .downloadCount(fileEntity.getDownloadCount())
                 .build();
    }
}
