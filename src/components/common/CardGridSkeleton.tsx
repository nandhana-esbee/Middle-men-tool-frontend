import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

interface CardGridSkeletonProps {
  count?: number;
  lines?: number;
}

export default function CardGridSkeleton({ count = 6, lines = 3 }: CardGridSkeletonProps) {
  return (
    <Grid container spacing={2.5}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid item xs={12} sm={6} md={4} key={`skeleton-${i}`}>
          <Card>
            <CardContent>
              <Stack spacing={1.25}>
                <Skeleton variant="text" width="55%" height={28} />
                <Skeleton variant="text" width="85%" />
                {Array.from({ length: lines }).map((__, j) => (
                  <Skeleton key={`skeleton-line-${j}`} variant="text" width={`${70 - j * 10}%`} />
                ))}
                <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
                  <Skeleton variant="rounded" width={64} height={24} />
                  <Skeleton variant="rounded" width={64} height={24} />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
