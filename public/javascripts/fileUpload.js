FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,

)
FilePond.setOptions({
    stylePanelAspectRatio: 200 / 150,
    imageResizeTargetWidth : 150,
    imageResizeTargetHeight : 200
})

FilePond.parse(document.body);