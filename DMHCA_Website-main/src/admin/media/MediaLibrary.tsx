import { useEffect, useState, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { FaUpload, FaTrash, FaCopy, FaImage, FaVideo, FaSearch } from 'react-icons/fa'

const MediaLibrary = () => {
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchFiles = async () => {
    setLoading(true)
    const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false })
    setFiles(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchFiles() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? [])
    if (!selectedFiles.length) return
    setUploading(true)
    for (const file of selectedFiles) {
      const isVideo = file.type.startsWith('video/')
      const bucket = isVideo ? 'videos' : 'images'
      const path = `${Date.now()}-${file.name}`
      const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true })
      if (error) continue
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path)
      await supabase.from('media').insert([{
        filename: file.name,
        url: publicUrl,
        bucket,
        file_type: file.type,
        size_bytes: file.size
      }])
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
    fetchFiles()
  }

  const handleDelete = async (file: any) => {
    if (!window.confirm('Delete this file? This will remove it from storage.')) return
    const path = file.url.split(`/${file.bucket}/`)[1]
    await supabase.storage.from(file.bucket).remove([path])
    await supabase.from('media').delete().eq('id', file.id)
    fetchFiles()
  }

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  const filtered = files.filter(f => f.filename.toLowerCase().includes(search.toLowerCase()))

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-500 text-sm">{files.length} files uploaded</p>
        </div>
        <label className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${uploading ? 'bg-gray-300 text-gray-500' : 'bg-[#002D72] hover:bg-[#003a8c] text-white'}`}>
          <FaUpload className="text-xs" />
          {uploading ? 'Uploading...' : 'Upload Files'}
          <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files..." className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D72]" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <FaImage className="text-4xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No media files yet</p>
          <p className="text-gray-400 text-sm mt-1">Upload images and videos to use across your website</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {filtered.map(file => (
            <div key={file.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
              {/* Thumbnail */}
              <div className="relative aspect-square bg-gray-100">
                {file.file_type?.startsWith('video/') ? (
                  <div className="w-full h-full flex items-center justify-center text-gray-400"><FaVideo className="text-3xl" /></div>
                ) : (
                  <img src={file.url} alt={file.filename} className="w-full h-full object-cover" />
                )}
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => handleCopy(file.url)} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors" title="Copy URL">
                    <FaCopy className={`text-xs ${copied === file.url ? 'text-green-500' : ''}`} />
                  </button>
                  <button onClick={() => handleDelete(file)} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="p-2">
                <p className="text-xs text-gray-700 truncate font-medium" title={file.filename}>{file.filename}</p>
                <p className="text-xs text-gray-400">{formatSize(file.size_bytes)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MediaLibrary
