"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { UploadIcon, TrashBinIcon, EyeIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FileWithPreview extends File {
  preview?: string;
}

export default function DropzoneInput() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [previewImage, setPreviewImage] = useState<FileWithPreview | null>(
    null,
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Keep a ref pointing to latest files for unmount cleanup
  const filesRef = useRef<FileWithPreview[]>(files);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        }),
      ),
    ]);
  }, []);

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => {
      const target = prevFiles.find((f) => f.name === fileName);
      if (target?.preview) {
        URL.revokeObjectURL(target.preview);
      }
      return prevFiles.filter((f) => f.name !== fileName);
    });
  };

  const handleOpenPreview = (file: FileWithPreview) => {
    setPreviewImage(file);
    setIsPreviewOpen(true);
  };

  // Revoke all object URLs only when unmounting to prevent memory leaks
  useEffect(() => {
    return () => {
      filesRef.current.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
      "image/svg+xml": [".svg"],
    },
    maxSize: 5 * 1024 * 1024,
  });

  const getBorderColor = () =>
    isDragReject
      ? "em-upload-invalid"
      : isDragAccept
        ? "em-upload-active"
        : isFocused
          ? "em-upload-focused"
          : "";

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full">
      <div {...getRootProps()} className={`em-upload-area ${getBorderColor()}`}>
        <input {...getInputProps()} />

        <div className="flex flex-col items-center">
          {/* Circular Upload Icon */}
          <div className="em-upload-icon">
            <UploadIcon className="size-7 text-current" />
          </div>

          {/* Heading */}
          <h4 className="em-card-title">
            {isDragReject
              ? "File type not supported"
              : isDragAccept
                ? "Drop images here"
                : isDragActive
                  ? "Drop files here"
                  : "Drop File Here"}
          </h4>

          {/* Subtitle */}
          <p className="em-upload-help">
            {isDragReject
              ? "Only PNG, JPG, WebP, and SVG images up to 5MB are allowed"
              : "Drag and drop your PNG, JPG, WebP, SVG images here or browse"}
          </p>

          {/* Browse Action */}
          <span className="text-sm font-medium text-brand-500 underline hover:text-brand-600">
            Browse File
          </span>
        </div>
      </div>

      {/* Uploaded Images Preview Gallery */}
      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-medium text-foreground dark:text-foreground">
              Uploaded Images ({files.length})
            </h5>
            <button
              type="button"
              onClick={() => {
                files.forEach((f) => {
                  if (f.preview) URL.revokeObjectURL(f.preview);
                });
                setFiles([]);
              }}
              className="text-xs font-medium text-error-500 hover:text-error-600 dark:text-error-400"
            >
              Clear all
            </button>
          </div>

          <div className="em-grid">
            {files.map((file) => (
              <div
                key={`${file.name}-${file.lastModified}`}
                data-columns={4}
                className="group em-upload-file em-span-4"
              >
                {/* Image Preview Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100 dark:bg-gray-100">
                  {file.preview ? (
                    <Image
                      src={file.preview}
                      alt={file.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <UploadIcon className="size-8" />
                    </div>
                  )}

                  <div className="em-upload-file-actions">
                    {file.preview && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={() => handleOpenPreview(file)}
                        title="Preview image"
                        aria-label={`Preview ${file.name}`}
                      >
                        <EyeIcon className="size-4" />
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      onClick={() => removeFile(file.name)}
                      title="Remove image"
                      aria-label={`Remove ${file.name}`}
                    >
                      <TrashBinIcon className="size-4" />
                    </Button>
                  </div>
                </div>

                {/* File Metadata */}
                <div className="p-3">
                  <p
                    className="truncate text-xs font-medium text-foreground dark:text-foreground"
                    title={file.name}
                  >
                    {file.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-2xl p-6 sm:p-8">
          {previewImage && (
            <div>
              <DialogHeader className="mb-4">
                <DialogTitle className="text-lg font-semibold text-foreground dark:text-foreground">
                  Image Preview
                </DialogTitle>
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                  {previewImage.name} • {formatFileSize(previewImage.size)}
                </p>
              </DialogHeader>

              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-border dark:bg-gray-100">
                {previewImage.preview && (
                  <Image
                    src={previewImage.preview}
                    alt={previewImage.name}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
