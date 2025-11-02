package main

import (
	"context"
	"encoding/json"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx context.Context
}

type Task struct {
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

func NewApp() *App {
	return &App{}
}

func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
}

// Görevleri JSON dosyasından aç
func (a *App) LoadTasks() ([]Task, error) {
	filename, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Görev Dosyası Aç",
	})
	if err != nil || filename == "" {
		return []Task{}, err
	}

	data, err := os.ReadFile(filename)
	if err != nil {
		return []Task{}, err
	}

	var tasks []Task
	err = json.Unmarshal(data, &tasks)
	if err != nil {
		return []Task{}, err
	}

	return tasks, nil
}

// Görevleri JSON dosyasına kaydet
func (a *App) SaveTasks(tasks []Task) (string, error) {
	filename, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title:           "Görevleri Kaydet",
		DefaultFilename: "tasks.json",
	})
	if err != nil || filename == "" {
		return "", err
	}

	data, err := json.MarshalIndent(tasks, "", "  ")
	if err != nil {
		return "", err
	}

	err = os.WriteFile(filename, data, 0644)
	if err != nil {
		return "", err
	}

	return "Kaydedildi: " + filename, nil
}
