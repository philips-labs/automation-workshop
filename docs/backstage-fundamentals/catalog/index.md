# Adding Components to the Software Catalog

## Understanding the Software Catalog

The Software Catalog is the central feature of Backstage. It provides a centralized inventory of all your software assets, making them discoverable and manageable. In this section, we'll add a real GitHub repository to your Backstage catalog.

## Creating a Sample Repository

Let's start by creating a sample repository on GitHub that we'll add to our Backstage catalog.

### Step 1: Create a New GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "backstage-demo")
4. Add a description (optional)
5. Make it public (for simplicity in this exercise)
6. Initialize it with a README
7. Click "Create repository"

### Step 2: Clone the Repository

Now, let's clone the repository to your local machine:

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/backstage-demo.git
cd backstage-demo
```

## Adding a Catalog Info File

To make your repository visible in Backstage, you need to add a `catalog-info.yaml` file to the root of your repository.

### Step 1: Create the Catalog Info File

Create a file named `catalog-info.yaml` in your repository with the following content:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: backstage-demo
  description: A demo component for Backstage
  annotations:
    github.com/project-slug: YOUR_USERNAME/backstage-demo
    backstage.io/techdocs-ref: dir:.
spec:
  type: service
  lifecycle: experimental
  owner: user:guest
```

Make sure to replace `YOUR_USERNAME` with your actual GitHub username.

### Step 2: Commit and Push the File

```bash
git add catalog-info.yaml
git commit -m "Add catalog-info.yaml for Backstage"
git push
```

## Registering the Component in Backstage

Now that your repository has a catalog info file, let's register it in Backstage.

### Method 1: Using the Backstage UI

1. Go to your Backstage instance (http://localhost:3000)
2. Click on "Create..." in the sidebar
3. Select "Register Existing Component"
4. Enter the URL to your catalog-info.yaml file:
   ```
   https://github.com/YOUR_USERNAME/backstage-demo/blob/main/catalog-info.yaml
   ```
5. Click "Import"

### Method 2: Using the app-config.yaml

Alternatively, you can add your repository to the `app-config.yaml` file in your Backstage app:

```yaml
catalog:
  locations:
    # Existing locations...
    - type: url
      target: https://github.com/YOUR_USERNAME/backstage-demo/blob/main/catalog-info.yaml
      rules:
        - allow: [Component]
```

After updating the config, restart your Backstage app for the changes to take effect.

## Viewing Your Component

1. Go to your Backstage instance (http://localhost:3000)
2. Click on "Catalog" in the sidebar
3. You should see your "backstage-demo" component listed
4. Click on it to view its details

## Adding More Information

Let's enhance our component with more information.

### Step 1: Update the Catalog Info File

Update your `catalog-info.yaml` file with more details:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: backstage-demo
  description: A demo component for Backstage
  annotations:
    github.com/project-slug: YOUR_USERNAME/backstage-demo
    backstage.io/techdocs-ref: dir:.
  tags:
    - demo
    - backstage
  links:
    - url: https://github.com/YOUR_USERNAME/backstage-demo
      title: GitHub Repository
      icon: github
spec:
  type: service
  lifecycle: experimental
  owner: user:guest
  system: demo-system
```

### Step 2: Add a System Entity

Create a new file named `system-info.yaml` in your repository:

```yaml
apiVersion: backstage.io/v1alpha1
kind: System
metadata:
  name: demo-system
  description: A demo system for Backstage
spec:
  owner: user:guest
```

### Step 3: Commit and Push the Changes

```bash
git add catalog-info.yaml system-info.yaml
git commit -m "Update catalog info and add system entity"
git push
```

### Step 4: Refresh in Backstage

Go back to your Backstage instance and refresh the page. You should see the updated information for your component, and a new "demo-system" entity in the catalog.

## Next Steps

Now that you've added a component to the catalog, let's add documentation to it using TechDocs.
