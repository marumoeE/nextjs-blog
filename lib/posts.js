import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // posts以下のファイル名を取得
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // ファイル名から「.md」を削除してidを取得する
        const id = fileName.replace(/\.md$/, '')

        // マークダウンファイルを文字列として読み込む
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // gray-matter を使用して、ポストのメタデータセクションを解析
        const matterResult = matter(fileContents)

        // データとidを組み合わせる
        return {
            id,
            ...matterResult.data
        }
    })
    // 日付順に投稿を並べ替える
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}