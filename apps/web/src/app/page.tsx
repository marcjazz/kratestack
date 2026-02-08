import { client } from '@kratestack/client';
import styles from './page.module.css';

export default async function Home() {
  const { data, error } = await client.GET('/api/hello');

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Kratestack</h1>
          <p className={styles.subtitle}>The Full-stack Rust & Next.js Template</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>API Response</h2>
          {error ? (
            <div className={styles.errorCard}>
              <p>Failed to connect to the Rust API.</p>
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
          ) : (
            <p className={styles.apiMessage}>{data?.message}</p>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>System Status</h2>
          <div className={styles.statusCard}>
            <div className={styles.statusDot} />
            <span>Frontend and Backend are connected</span>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Stack</h2>
          <div className={styles.stackGrid}>
            <div className={styles.stackItem}>Axum</div>
            <div className={styles.stackItem}>Next.js</div>
            <div className={styles.stackItem}>TypeScript</div>
            <div className={styles.stackItem}>OpenAPI</div>
          </div>
        </section>
      </main>
    </div>
  );
}
