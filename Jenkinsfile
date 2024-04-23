
pipeline {
    agent any
    
    triggers {
        // Trigger untuk memicu polling Git SCM saat webhook GitHub diterima
        githubPush()
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout kode dari monorepo
                checkout scm
            }
        }
        
        stage('Identify Changed Component') {
            steps {
                script {
                    // Ambil informasi perubahan dari env.GIT_COMMIT dan env.GIT_PREVIOUS_COMMIT
                    def changes = sh(script: "git diff --name-only ${env.GIT_PREVIOUS_COMMIT} ${env.GIT_COMMIT}", returnStdout: true).trim()
                    
                    // Periksa apakah ada perubahan di direktori komponen tertentu (e.g. component1)
                    def component1Changed = changes.contains('apps/web/')
                    
                    // Simpan hasil pemeriksaan untuk digunakan di tahap berikutnya
                    env.COMPONENT1_CHANGED = component1Changed ? 'true' : 'false'
                }
            }
        }
        
        stage('Build and Test Component1') {
            when {
                // Tahap ini hanya berjalan jika ada perubahan di component1
                equals(expected: 'true', actual: env.COMPONENT1_CHANGED)
            }
            steps {
                // Bangun komponen1
              sh 'docker login -u faris94 -p Insider2816.'
              sh 'docker build . -t faris94/apps:web -f apps/web/Dockerfile'
              sh 'docker push faris94/apps:web'
            }
        }

        stage('Identify Changed Component') {
            steps {
                script {
                    // Ambil informasi perubahan dari env.GIT_COMMIT dan env.GIT_PREVIOUS_COMMIT
                    def changes = sh(script: "git diff --name-only ${env.GIT_PREVIOUS_COMMIT} ${env.GIT_COMMIT}", returnStdout: true).trim()
                    
                    // Periksa apakah ada perubahan di direktori komponen tertentu (e.g. component1)
                    def component1Changed = changes.contains('apps/api/')
                    
                    // Simpan hasil pemeriksaan untuk digunakan di tahap berikutnya
                    env.COMPONENT1_CHANGED = component1Changed ? 'true' : 'false'
                }
            }
        }
        
        stage('Build and Test Component1') {
            when {
                // Tahap ini hanya berjalan jika ada perubahan di component1
                equals(expected: 'true', actual: env.COMPONENT1_CHANGED)
            }
            steps {
                // Bangun komponen1
              sh 'docker login -u faris94 -p Insider2816.'
              sh 'docker build . -t faris94/apps:api -f apps/web/Dockerfile'
              sh 'docker push faris94/apps:api'
            }
        }
        // stage('Deploy Component1') {
        //     when {
        //         // Tahap ini hanya berjalan jika ada perubahan di component1
        //         equals(expected: 'true', actual: env.COMPONENT1_CHANGED)
        //     }
        //     steps {
        //         // Deploy komponen1
        //         sh 'cd component1 && ./deploy.sh'
        //     }
        // }
        
        // Tambahkan tahap-tahap serupa untuk komponen lain jika diperlukan
    }
}
